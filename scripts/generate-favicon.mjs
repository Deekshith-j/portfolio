import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

// 1. Create a modern, high-tech SVG favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="dj-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="50%" stop-color="#9333ea" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
    <filter id="dj-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Squircle -->
  <rect width="64" height="64" rx="16" fill="#0b0b10" />
  <rect x="1" y="1" width="62" height="62" rx="15" stroke="url(#dj-grad)" stroke-width="1.5" stroke-opacity="0.5" fill="none" />

  <!-- Monogram D -->
  <path
    d="M20 18 H32.5 C41.5 18 47.5 24 47.5 32 C47.5 40 41.5 46 32.5 46 H20 V18 Z"
    stroke="url(#dj-grad)"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />

  <!-- Neural AI Core Node -->
  <circle cx="32" cy="32" r="3.5" fill="#c084fc" filter="url(#dj-glow)" />
  <circle cx="32" cy="32" r="1.8" fill="#ffffff" />
</svg>
`;

fs.writeFileSync(path.join(publicDir, "favicon.svg"), svgContent.trim());
console.log("Written favicon.svg");

// 2. Generate a 32x32 RGBA PNG and wrap it into favicon.ico
const size = 32;
const rawRows = [];

// Helper CRC32
function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// Generate pixel grid for 32x32: sleek dark background (#0b0b10) with purple 'D' monogram
const pixels = Buffer.alloc(size * size * 4);
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const idx = (y * size + x) * 4;
    // rounded corner check
    const rx = Math.min(x, size - 1 - x);
    const ry = Math.min(y, size - 1 - y);
    if (rx < 4 && ry < 4 && (4 - rx) ** 2 + (4 - ry) ** 2 > 16) {
      // transparent corner
      pixels[idx] = 0;
      pixels[idx + 1] = 0;
      pixels[idx + 2] = 0;
      pixels[idx + 3] = 0;
      continue;
    }

    // Default dark bg
    let r = 11,
      g = 11,
      b = 16,
      a = 255;

    // Border
    if (
      x === 0 ||
      x === size - 1 ||
      y === 0 ||
      y === size - 1 ||
      (rx < 4 && ry < 4 && (4 - rx) ** 2 + (4 - ry) ** 2 > 10)
    ) {
      r = 147;
      g = 51;
      b = 234;
      a = 200;
    }

    // 'D' shape
    // Stem: x in [8, 11], y in [7, 24]
    const inStem = x >= 8 && x <= 11 && y >= 7 && y <= 24;
    // Top bar: y in [7, 9], x in [8, 18]
    const inTop = y >= 7 && y <= 9 && x >= 8 && x <= 18;
    // Bottom bar: y in [22, 24], x in [8, 18]
    const inBottom = y >= 22 && y <= 24 && x >= 8 && x <= 18;
    // Arc: outer circle approx center (16, 16), radius 8; inner radius 5
    const dx = x - 17;
    const dy = y - 15.5;
    const distSq = dx * dx + dy * dy;
    const inArc = x >= 16 && distSq <= 8.5 * 8.5 && distSq >= 4.5 * 4.5;

    // Center dot
    const inDot = (x - 16) ** 2 + (y - 15.5) ** 2 <= 2.25;

    if (inStem || inTop || inBottom || inArc) {
      // Gradient purple -> violet
      const t = (x + y) / (size * 2);
      r = Math.round(192 * (1 - t) + 99 * t);
      g = Math.round(132 * (1 - t) + 102 * t);
      b = Math.round(252 * (1 - t) + 241 * t);
      a = 255;
    } else if (inDot) {
      r = 255;
      g = 255;
      b = 255;
      a = 255;
    }

    pixels[idx] = r;
    pixels[idx + 1] = g;
    pixels[idx + 2] = b;
    pixels[idx + 3] = a;
  }
}

// Assemble PNG scanlines
const scanlines = [];
for (let y = 0; y < size; y++) {
  scanlines.push(Buffer.from([0])); // filter type 0 (None)
  scanlines.push(pixels.subarray(y * size * 4, (y + 1) * size * 4));
}
const rawScanlineData = Buffer.concat(scanlines);
const compressed = zlib.deflateSync(rawScanlineData);

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(size, 0);
ihdr.writeUInt32BE(size, 4);
ihdr[8] = 8; // 8 bits per channel
ihdr[9] = 6; // RGBA
ihdr[10] = 0; // deflate
ihdr[11] = 0; // filter
ihdr[12] = 0; // no interlace

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const pngBuffer = Buffer.concat([
  pngSignature,
  makeChunk("IHDR", ihdr),
  makeChunk("IDAT", compressed),
  makeChunk("IEND", Buffer.alloc(0)),
]);

// Wrap PNG into ICO
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // icon
icoHeader.writeUInt16LE(1, 4); // 1 image

const icoEntry = Buffer.alloc(16);
icoEntry[0] = size; // width
icoEntry[1] = size; // height
icoEntry[2] = 0; // color count
icoEntry[3] = 0; // reserved
icoEntry.writeUInt16LE(1, 4); // color planes
icoEntry.writeUInt16LE(32, 6); // bits per pixel
icoEntry.writeUInt32LE(pngBuffer.length, 8); // size of image data
icoEntry.writeUInt32LE(22, 12); // offset of image data (6 + 16 = 22)

const icoBuffer = Buffer.concat([icoHeader, icoEntry, pngBuffer]);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
console.log("Written favicon.ico (size: " + icoBuffer.length + " bytes)");
