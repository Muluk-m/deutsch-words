import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const iconsDir = join(publicDir, 'icons');

const svgPath = join(publicDir, 'logo.svg');

// 为 maskable 图标添加内边距的 SVG（40% safe zone）
const createMaskableSvg = (originalSvg, size) => {
  const padding = Math.round(size * 0.1); // 10% padding on each side
  const innerSize = size - padding * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#4f46e5"/>
    <g transform="translate(${padding}, ${padding})">
      <svg width="${innerSize}" height="${innerSize}" viewBox="0 0 512 512">
        ${originalSvg.replace(/<\?xml[^>]*\?>|<svg[^>]*>|<\/svg>/g, '')}
      </svg>
    </g>
  </svg>`;
};

async function generateIcons() {
  // 创建 icons 目录
  await mkdir(iconsDir, { recursive: true });

  const sizes = [192, 512];

  // 读取原始 SVG
  const svgBuffer = await sharp(svgPath).toBuffer();
  const svgString = (await import('fs')).readFileSync(svgPath, 'utf-8');

  for (const size of sizes) {
    // 生成标准图标
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(join(iconsDir, `icon-${size}.png`));

    console.log(`✓ Generated icon-${size}.png`);

    // 生成 maskable 图标（带背景色和内边距）
    const maskableSvg = createMaskableSvg(svgString, size);
    await sharp(Buffer.from(maskableSvg))
      .resize(size, size)
      .png()
      .toFile(join(iconsDir, `icon-maskable-${size}.png`));

    console.log(`✓ Generated icon-maskable-${size}.png`);
  }

  // 生成 apple-touch-icon (180x180)
  await sharp(svgPath)
    .resize(180, 180)
    .png()
    .toFile(join(iconsDir, 'apple-touch-icon.png'));

  console.log('✓ Generated apple-touch-icon.png');

  // 生成 favicon (32x32)
  await sharp(svgPath)
    .resize(32, 32)
    .png()
    .toFile(join(iconsDir, 'favicon-32x32.png'));

  console.log('✓ Generated favicon-32x32.png');

  // 生成 favicon (16x16)
  await sharp(svgPath)
    .resize(16, 16)
    .png()
    .toFile(join(iconsDir, 'favicon-16x16.png'));

  console.log('✓ Generated favicon-16x16.png');

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(console.error);
