const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
async function convert(source, target, size, quality = 80) {
  const out = path.join(root, target);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(path.join(root, source)).resize({ width: size, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(out);
}
async function main() {
  const files = await fs.readdir(path.join(root, 'productos'));
  for (const file of files.filter(f => f.endsWith('.png'))) {
    const name = path.basename(file, '.png');
    for (const size of [320, 512]) await convert(`productos/${file}`, `productos/optimizados/${name}-${size}.webp`, size, 82);
  }
  for (const file of ['chimney-azucar-canela', 'chimney-pistacho', 'chimney-cacao']) {
    for (const size of [480, 800, 1254]) await convert(`assets/hero/${file}.png`, `assets/optimizados/${file}-${size}.webp`, size, 80);
  }
  await convert('assets/marca/logo-original.png', 'assets/optimizados/logo-128.webp', 128, 86);
  await convert('assets/marca/logo-original.png', 'assets/optimizados/logo-320.webp', 320, 86);
  await convert('assets/secuencia/roll-00.png', 'assets/optimizados/historia-460.webp', 460, 82);
  await convert('assets/galeria/obrador-generado.jpg', 'assets/optimizados/obrador-1000.webp', 1000, 80);
  console.log('Imágenes optimizadas generadas.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
