const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
const rawSiteUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'http://localhost:8000';
const siteUrl = new URL(rawSiteUrl.includes('://') ? rawSiteUrl : `https://${rawSiteUrl}`).origin.replace(/\/$/, '');
const isProduction = process.env.VERCEL_ENV === 'production' || (!process.env.VERCEL_ENV && Boolean(process.env.SITE_URL));
// dist is generated output only; never copy the project repository or source assets wholesale.
fs.rmSync(out, { recursive: true, force: true });
for (const item of ['index.html', 'css/experiencia.css', 'js/experiencia.js', 'js/loading.js', 'js/vendor', 'assets/optimizados', 'assets/marca', 'productos/optimizados']) {
  const source = path.join(root, item);
  const target = path.join(out, item);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}
const deployedHtml = fs.readFileSync(path.join(out, 'index.html'), 'utf8')
  .replaceAll('__SITE_URL__', siteUrl)
  .replaceAll('__ROBOTS__', isProduction ? 'index,follow' : 'noindex,nofollow');
fs.writeFileSync(path.join(out, 'index.html'), deployedHtml);
const sitemapUrl = `${siteUrl}/`;
fs.writeFileSync(path.join(out, 'robots.txt'), isProduction
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(out, 'sitemap.xml'), isProduction
  ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${sitemapUrl}</loc></url></urlset>\n`
  : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n');
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
