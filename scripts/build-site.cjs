const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
// dist is generated output only; never copy the project repository or source assets wholesale.
fs.rmSync(out, { recursive: true, force: true });
for (const item of ['index.html', 'css/experiencia.css', 'js/experiencia.js', 'js/loading.js', 'js/vendor', 'assets/optimizados', 'assets/marca/favicon.png', 'productos/optimizados']) {
  const source = path.join(root, item);
  const target = path.join(out, item);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}
esbuild.buildSync({
  entryPoints: [path.join(root, 'js/speed-insights.js')],
  outfile: path.join(out, 'js/speed-insights.bundle.js'),
  bundle: true,
  minify: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production') },
});
console.log('Web estática preparada en dist/.');
