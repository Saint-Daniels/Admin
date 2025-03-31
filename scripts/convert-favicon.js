const sharp = require('sharp');
const path = require('path');

async function convertToFavicon() {
  const inputPath = path.join(process.cwd(), 'public', 'images', 'saintdanielslogo.jpeg');
  const outputDir = path.join(process.cwd(), 'public');

  // Create different sizes for favicon
  const sizes = [16, 32, 180];

  try {
    for (const size of sizes) {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, `favicon-${size}x${size}.png`));
    }

    console.log('Favicon files generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

convertToFavicon(); 