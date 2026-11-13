#!/usr/bin/env node
/**
 * Turns the full-size originals in media/originals/ into web-sized JPEGs in
 * public/images/, and writes src/mediaManifest.json listing every image per
 * folder (with its width and height).
 *
 *   media/originals/fotografia/festivais/STEREOLAB-02.jpg
 *     -> public/images/fotografia/festivais/stereolab-02.jpg
 *
 * Usage: npm run images        (macOS — uses the built-in `sips`)
 *
 * Only new or changed originals are re-encoded. Web images whose original was
 * deleted are removed too.
 */
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const SRC = path.join(ROOT, "media/originals")
const OUT = path.join(ROOT, "public/images")
const MANIFEST = path.join(ROOT, "src/mediaManifest.json")
const MAX_EDGE = 2000
const QUALITY = 80
const IMAGE = /\.(jpe?g|png|webp|heic|tiff?)$/i

/** "4020 - 9171 - fuji400 - ALTA - Patrick Galvao -04.JPG" -> "fuji400-patrick-galvao-04" */
export function slugify(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+ - \d+ - /, "") // lab order numbers on film scans
    .replace(/\b(ALTA|URG)\b/g, "")
    .replace(/\s*\(\d+\)$/, "") // "name (1)" duplicates
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const sips = (...args) => execFileSync("sips", args, { encoding: "utf8" })

function dimensions(file) {
  const info = sips("-g", "pixelWidth", "-g", "pixelHeight", "-g", "orientation", file)
  const read = (key) => Number(info.match(new RegExp(`${key}: (\\d+)`))?.[1] ?? 0)
  const width = read("pixelWidth")
  const height = read("pixelHeight")
  // EXIF orientations 5–8 are rotated 90°: the browser shows them swapped.
  return read("orientation") >= 5 ? { width: height, height: width } : { width, height }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return IMAGE.test(entry.name) ? [full] : []
  })
}

const manifest = {}
const produced = new Set()
let encoded = 0

for (const original of walk(SRC).sort((a, b) => a.localeCompare(b, "en", { numeric: true }))) {
  const folder = path.relative(SRC, path.dirname(original)).split(path.sep).join("/")
  const slug = slugify(path.basename(original))
  const target = path.join(OUT, folder, `${slug}.jpg`)
  produced.add(target)

  const stale =
    !fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(original).mtimeMs
  if (stale) {
    fs.mkdirSync(path.dirname(target), { recursive: true })
    sips(
      "-s", "format", "jpeg",
      "-s", "formatOptions", String(QUALITY),
      "-Z", String(MAX_EDGE),
      original,
      "--out", target,
    )
    encoded += 1
  }

  ;(manifest[folder] ??= []).push({
    id: slug,
    src: `/images/${folder}/${slug}.jpg`,
    ...dimensions(target),
  })
}

// Drop web images whose original is gone.
for (const file of walk(OUT)) if (!produced.has(file)) fs.rmSync(file)

fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
const total = Object.values(manifest).reduce((sum, list) => sum + list.length, 0)
console.log(`images: ${total} total, ${encoded} encoded -> public/images, manifest -> src/mediaManifest.json`)
