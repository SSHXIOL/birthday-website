import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_URL = 'https://abby-birthday-app.vercel.app/';

async function generate() {
  console.log('Generating Heart QR Code for:', TARGET_URL);

  // Generate QR matrix
  const qr = QRCode.create(TARGET_URL, {
    errorCorrectionLevel: 'H',
  });

  const modules = qr.modules;
  const size = modules.size;
  const qrBoxSize = 340; // Size of QR code inside center
  const cellSize = qrBoxSize / size;
  const qrOffsetX = 400 - qrBoxSize / 2; // centered at x=400 -> 230
  const qrOffsetY = 370 - qrBoxSize / 2; // centered at y=370 -> 200

  let qrPaths = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules.get(r, c)) {
        const x = qrOffsetX + c * cellSize;
        const y = qrOffsetY + r * cellSize;
        // Check if inside center logo cutout to leave space for tiny heart
        const centerMin = (size / 2) - 3.5;
        const centerMax = (size / 2) + 3.5;
        if (r >= centerMin && r <= centerMax && c >= centerMin && c <= centerMax) {
          continue; // Leave center empty for heart logo
        }
        qrPaths += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(cellSize + 0.3).toFixed(2)}" height="${(cellSize + 0.3).toFixed(2)}" rx="1.5" fill="#2b092a" />\n`;
      }
    }
  }

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Background Outer Glow Filter -->
    <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#ff2a6d" flood-opacity="0.35" />
    </filter>

    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.25" />
    </filter>

    <!-- Romantic Heart Gradient -->
    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff4d6d" />
      <stop offset="35%" stop-color="#f72585" />
      <stop offset="70%" stop-color="#7209b7" />
      <stop offset="100%" stop-color="#3a0ca3" />
    </linearGradient>

    <!-- Subtle Shimmer Overlay Gradient -->
    <linearGradient id="shimmer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.03" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.2" />
    </linearGradient>

    <!-- Center QR Container Gradient -->
    <linearGradient id="qrCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fff5f8" />
    </linearGradient>
  </defs>

  <!-- Dark Atmospheric Backdrop for standalone viewing -->
  <rect width="800" height="800" fill="#140a16" rx="40" />

  <!-- Ambient background glow blobs -->
  <circle cx="400" cy="380" r="320" fill="#f72585" opacity="0.12" filter="blur(60px)" />
  <circle cx="250" cy="220" r="180" fill="#ff4d6d" opacity="0.15" filter="blur(40px)" />
  <circle cx="550" cy="220" r="180" fill="#7209b7" opacity="0.15" filter="blur(40px)" />

  <!-- MAIN HEART SHAPE -->
  <!-- Coords: Cleft at (400,160), Lobe Left at (210,60), Outer Left at (70,250), Bottom Tip at (400,710) -->
  <g filter="url(#heartShadow)">
    <path
      d="M 400 170
         C 370 100, 280 60, 200 80
         C 100 110, 60 210, 80 310
         C 110 440, 260 580, 400 700
         C 540 580, 690 440, 720 310
         C 740 210, 700 110, 600 80
         C 520 60, 430 100, 400 170 Z"
      fill="url(#heartGradient)"
    />
    <!-- Shimmer Highlight Layer -->
    <path
      d="M 400 170
         C 370 100, 280 60, 200 80
         C 100 110, 60 210, 80 310
         C 110 440, 260 580, 400 700
         C 540 580, 690 440, 720 310
         C 740 210, 700 110, 600 80
         C 520 60, 430 100, 400 170 Z"
      fill="url(#shimmer)"
    />
    <!-- Delicate Heart Border -->
    <path
      d="M 400 170
         C 370 100, 280 60, 200 80
         C 100 110, 60 210, 80 310
         C 110 440, 260 580, 400 700
         C 540 580, 690 440, 720 310
         C 740 210, 700 110, 600 80
         C 520 60, 430 100, 400 170 Z"
      fill="none"
      stroke="#ffffff"
      stroke-width="3"
      stroke-opacity="0.4"
    />
  </g>

  <!-- Sparkles & Hearts on Top Lobes -->
  <!-- Left Lobe Text & Accents -->
  <g fill="#ffffff" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
    <text x="250" y="145" font-size="18" font-weight="bold" letter-spacing="1.5" fill="#ffffff" opacity="0.95">FOR MY ABBY</text>
    <text x="250" y="168" font-size="12" font-weight="normal" fill="#ffd1dc" letter-spacing="1">HAPPY 17TH BIRTHDAY</text>
  </g>

  <!-- Right Lobe Text & Accents -->
  <g fill="#ffffff" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
    <text x="550" y="145" font-size="18" font-weight="bold" letter-spacing="1.5" fill="#ffffff" opacity="0.95">SCAN TO UNLOCK</text>
    <text x="550" y="168" font-size="12" font-weight="normal" fill="#ffd1dc" letter-spacing="1">A SPECIAL SURPRISE</text>
  </g>

  <!-- Sparkle Icons -->
  <path d="M 140 210 Q 140 225 155 225 Q 140 225 140 240 Q 140 225 125 225 Q 140 225 140 210 Z" fill="#ffffff" opacity="0.8" />
  <path d="M 660 210 Q 660 225 675 225 Q 660 225 660 240 Q 660 225 645 225 Q 660 225 660 210 Z" fill="#ffffff" opacity="0.8" />
  <path d="M 400 105 Q 400 115 410 115 Q 400 115 400 125 Q 400 115 390 115 Q 400 115 400 105 Z" fill="#ffd1dc" opacity="0.9" />

  <!-- CENTER QR CODE CONTAINER CARD -->
  <g filter="url(#cardShadow)">
    <!-- White Rounded Card Background -->
    <rect
      x="${qrOffsetX - 25}"
      y="${qrOffsetY - 25}"
      width="${qrBoxSize + 50}"
      height="${qrBoxSize + 50}"
      rx="28"
      fill="url(#qrCardGrad)"
      stroke="#ffb3c6"
      stroke-width="2.5"
    />
    <!-- Delicate Inner Border -->
    <rect
      x="${qrOffsetX - 18}"
      y="${qrOffsetY - 18}"
      width="${qrBoxSize + 36}"
      height="${qrBoxSize + 36}"
      rx="22"
      fill="none"
      stroke="#ffe5ec"
      stroke-width="1.5"
    />

    <!-- Actual Scannable QR Code Rectangles -->
    ${qrPaths}

    <!-- Center Cutout Pill/Badge for Heart Icon -->
    <circle cx="400" cy="370" r="30" fill="#ffffff" stroke="#ff4d6d" stroke-width="2.5" />
    <!-- Heart Icon inside QR Center -->
    <path
      d="M 400 382
         c -1.2 -1.2 -10.5 -8.5 -10.5 -14.5
         c 0 -4.2 3.3 -7.5 7.5 -7.5
         c 2.2 0 4.2 1 5.5 2.5
         c 1.3 -1.5 3.3 -2.5 5.5 -2.5
         c 4.2 0 7.5 3.3 7.5 7.5
         c 0 6 -9.3 13.3 -10.5 14.5
         l -2.5 2.5 Z"
      fill="#ff2a6d"
    />
  </g>

  <!-- BOTTOM TEXT INSIDE HEART TIP -->
  <g font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
    <!-- Camera hint badge -->
    <rect x="275" y="582" width="250" height="34" rx="17" fill="#ffffff" fill-opacity="0.2" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
    <text x="400" y="604" font-size="13" font-weight="bold" fill="#ffffff" letter-spacing="0.5">
      &#128247; Open Camera &amp; Scan
    </text>

    <!-- Sweet Romantic Footnote -->
    <text x="400" y="645" font-family="Georgia, serif" font-style="italic" font-size="18" fill="#ffe5ec" opacity="0.95">
      &#8220;Happy 17th Birthday, my love&#8221;
    </text>
    <text x="400" y="668" font-size="12" font-weight="normal" fill="#ffccd5" opacity="0.85">
      September 30th &#8226; Forever &amp; Always
    </text>
  </g>
</svg>`;

  const outSvgPath = path.resolve(__dirname, '../public/qr-heart.svg');
  fs.writeFileSync(outSvgPath, svgContent, 'utf8');
  console.log('Saved SVG Heart QR to:', outSvgPath);

  // Render to high-res PNG with resvg
  try {
    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const outPngPath = path.resolve(__dirname, '../public/qr-heart.png');
    fs.writeFileSync(outPngPath, pngBuffer);
    console.log('Saved High-Res Heart QR PNG to:', outPngPath);
  } catch (err) {
    console.warn('Resvg PNG rendering note:', err);
  }
}

generate().catch(console.error);
