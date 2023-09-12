const { createCanvas } = require('canvas');
const fs = require('fs');

// Function to generate a random pastel color
const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 85%)`;
};

// Function to draw lines
const drawLines = (context, centerX, centerY) => {
  const lineCount = Math.floor(16 + Math.random() * 16);
  const length = 200 + Math.random() * 200;
  const thickness = 1 + Math.random() * 3;
  const angleStep = (Math.PI * 2) / lineCount;

  context.lineWidth = thickness;

  for (let i = 0; i < lineCount; i++) {
    const angle = angleStep * i;

    const x1 = centerX + length * Math.cos(angle);
    const y1 = centerY + length * Math.sin(angle);
    const x2 = centerX - length * Math.cos(angle);
    const y2 = centerY - length * Math.sin(angle);

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
};

// Function to draw rectangles
const drawRectangles = (context, centerX, centerY) => {
  const rectCount = Math.floor(2 + Math.random() * 6);

  for (let i = 0; i < rectCount; i++) {
    const angle = (Math.PI / 4) * i;
    const length = 50 + Math.random() * 150;
    const width = 10 + Math.random() * 30;

    context.save();
    context.translate(centerX, centerY);
    context.rotate(angle);

    context.beginPath();
    context.rect(-width / 2, -length / 2, width, length);
    context.stroke();
    context.restore();
  }
};

// Create canvas
const canvas = createCanvas(800, 800);
const ctx = canvas.getContext('2d');

// Draw background
ctx.fillStyle = generatePastelColor();
ctx.fillRect(0, 0, 800, 800);

// Set line style
ctx.strokeStyle = '#000000';

// Draw lines and shapes
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

drawLines(ctx, centerX, centerY); // More random lines
drawRectangles(ctx, centerX, centerY); // Art Deco rectangles

// Save image to disk
const out = fs.createWriteStream(__dirname + `/image_${Date.now()}.png`);
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('Image created.'));
