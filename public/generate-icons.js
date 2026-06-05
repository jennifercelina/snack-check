#!/usr/bin/env node
// Run: node generate-icons.js
// Requires: npm install canvas

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 192, 512];
const outDir = path.join(__dirname, 'icons');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

sizes.forEach((size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.18);
  ctx.fill();

  // Accent ring
  ctx.strokeStyle = '#DCE775';
  ctx.lineWidth = size * 0.04;
  const r = size * 0.36;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
  ctx.stroke();

  // Letter N
  ctx.fillStyle = '#DCE775';
  ctx.font = `bold ${size * 0.42}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('N', size / 2, size / 2 + size * 0.02);

  // Small dot accent
  ctx.fillStyle = '#DCE775';
  ctx.beginPath();
  ctx.arc(size * 0.68, size * 0.32, size * 0.05, 0, Math.PI * 2);
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, `icon-${size}.png`), buffer);
  console.log(`✓ icon-${size}.png`);
});

console.log('All icons generated!');
