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
 for(const match of html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"?#]+)"/g))assert.ok(fs.existsSync(path.join(root,match[1]))||fs.existsSync(path.join(root,'dist',match[1])),match[1]);
});
test('la página tiene idioma, metadatos, esquema local y enlace de pedido', () => {
 assert.match(html,/<html lang="es">/);assert.match(html,/<meta name="description"/);assert.match(html,/<h1\b/);assert.match(html,/application\/ld\+json/);assert.match(html,/ubereats\.com/);
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);assert.equal(schema.name,'Buen Rollito Chimney Cake');assert.equal(schema.address.addressLocality,'León');
});
test('el código de interacción es sintácticamente válido', () => assert.doesNotThrow(()=>new vm.Script(js)));

test('la salida de Vercel contiene la web y sus recursos, sin archivos internos', () => {
 const output = path.join(root, 'dist');
 const deployed = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
 for (const match of deployed.matchAll(/(?:src|href)="((?:assets|css|js|productos)\/[^"?#]+)"/g)) {
   assert.ok(fs.existsSync(path.join(output, match[1])), match[1]);
 }
 for (const match of deployed.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) {
   for (const candidate of match[1].split(',')) {
     const file = candidate.trim().split(/\s+/)[0];
     assert.ok(fs.existsSync(path.join(output, file)), file);
   }
 }
 for (const p of products) for (const size of [320, 512]) assert.ok(fs.existsSync(path.join(output, `productos/optimizados/${p[2]}-${size}.webp`)));
 for (const privatePath of ['.git', 'node_modules', 'documentacion', 'scripts', 'package.json', 'README.md']) assert.equal(fs.existsSync(path.join(output, privatePath)), false, privatePath);
 const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8').replace(/^\uFEFF/, ''));
 assert.equal(config.outputDirectory, 'dist');
});

test('la bienvenida muestra el cartel y permite entrar sin esperar', () => {
 const code = fs.readFileSync(path.join(root, 'js/loading.js'), 'utf8');
 const listeners = {};
 const bar = {style:{}};
 const message = {};
 const skip = {addEventListener(name, fn){listeners.skip=fn}};
 const loading = {classList:{add(name){loading.state=name}},setAttribute(name, value){loading[name]=value}};
 const elements = {'#loading':loading, '#loading-message':message, '#loading-progress':bar, '#loading-skip':skip};
 const context = {document:{querySelector: selector => elements[selector], activeElement:null}, sessionStorage:{getItem(){return null},setItem(){}}, Math, matchMedia:()=>({matches:false}), setTimeout:()=>1, clearTimeout(){}, requestAnimationFrame:()=>1, cancelAnimationFrame(){}};
 vm.runInNewContext(code, context, {timeout:1000});
 assert.ok(message.textContent.length > 0);
 assert.ok(fs.existsSync(path.join(root,'dist/assets/optimizados/bienvenida-abierto-960.webp')));
 listeners.skip();
 assert.equal(loading.state, 'done');
 assert.equal(loading['aria-hidden'], 'true');
});
