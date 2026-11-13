const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'js/experiencia.js'), 'utf8');
const products = vm.runInNewContext(js.split('\n')[0] + ';products', {}, {timeout:1000});
test('la carta está en HTML y sus 24 productos tienen imágenes optimizadas', () => {
  assert.equal(products.length,24);
  assert.equal(new Set(products.map(p=>p[2])).size,24);
  for(const p of products){assert.ok(html.includes(`data-product="${p[2]}"`),p[0]);for(const n of [320,512])assert.ok(fs.existsSync(path.join(root,`productos/optimizados/${p[2]}-${n}.webp`)),p[2]);}
});
test('las referencias locales de la página existen', () => {
 for(const match of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"?#]+)"/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);
});
test('la página tiene idioma, metadatos, esquema local y enlace de pedido', () => {
 assert.match(html,/<html lang="es">/);assert.match(html,/<meta name="description"/);assert.match(html,/<h1\b/);assert.match(html,/application\/ld\+json/);assert.match(html,/ubereats\.com/);
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);assert.equal(schema.name,'Buen Rollito Chimney Cake');assert.equal(schema.address.addressLocality,'León');
});
test('el código de interacción es sintácticamente válido', () => assert.doesNotThrow(()=>new vm.Script(js)));
