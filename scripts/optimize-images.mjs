import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const OUTPUT_DIR = path.join(PUBLIC_DIR, "_img");
const MANIFEST_PATH = path.join("src", "generated", "images.json");
export const IMAGE_WIDTHS = [
  16, 32, 48, 64, 96, 128, 256, 384,
  640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];

const DEFAULT_QUALITY = 75;

const QUALITY_OVERRIDES = {
  "/extendedavatar.png": 100,
};

const SKIP = new Set(["/og-image.png"]);

function listPngs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return fullPath === OUTPUT_DIR ? [] : listPngs(fullPath);
    }

    return entry.name.endsWith(".png") ? [fullPath] : [];
  });
}

function toPublicUrl(filePath) {
  return "/" + path.relative(PUBLIC_DIR, filePath).split(path.sep).join("/");
}

function isFresh(output, source) {
  return (
    fs.existsSync(output) &&
    fs.statSync(output).mtimeMs >= fs.statSync(source).mtimeMs
  );
}

const manifest = {};
let generated = 0;

for (const file of listPngs(PUBLIC_DIR)) {
  const url = toPublicUrl(file);

  if (SKIP.has(url)) continue;

  const { width, height } = await sharp(file).metadata();
  const quality = QUALITY_OVERRIDES[url] ?? DEFAULT_QUALITY;

  const widths = [
    ...IMAGE_WIDTHS.filter((w) => w < width),
    Math.min(width, IMAGE_WIDTHS.at(-1)),
  ];

  for (const w of widths) {
    const output = path.join(OUTPUT_DIR, `${url.slice(1, -4)}-${w}.webp`);

    if (isFresh(output, file)) continue;

    fs.mkdirSync(path.dirname(output), { recursive: true });
    await sharp(file).resize({ width: w }).webp({ quality }).toFile(output);
    generated += 1;
  }

  manifest[url] = { width, height, widths };
}

fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

console.log(
  `images: ${Object.keys(manifest).length} sources, ${generated} variants generated`,
);