const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'index.html');
const source = fs.readFileSync(path.join(root, 'js/experiencia.js'), 'utf8').split('\n')[0];
const products = vm.runInNewContext(`${source}; products`, {}, {timeout: 1000});
const colors = ['#f4c9bc','#f2dda4','#cde4c2','#b8ded8','#e4d4e2'];
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cards = products.map((p,i) => `<button type="button" class="option" data-product="${escape(p[2])}" aria-pressed="${i===0}" style="--color:${colors[i%colors.length]}"><span class="option-img"><img src="productos/optimizados/${escape(p[2])}-320.webp" alt="" width="320" height="320" loading="lazy" decoding="async"></span><span class="option-name">${escape(p[0])}<small>${escape(p[1])} €</small></span><span class="option-arrow" aria-hidden="true">›</span></button>`).join('');
const first = products[0];
const featured = `<div class="featured-visual"><span>${escape(first[4])}</span><img src="productos/optimizados/${escape(first[2])}-512.webp" width="512" height="512" alt="${escape(first[0])}" loading="lazy" decoding="async"></div><div class="featured-info"><div><h3>${escape(first[0])}</h3><p>${escape(first[1])} €</p></div><a class="order-btn" href="https://www.ubereats.com/es-en/store/buen-rollito-chimney/FR-O0IdEUKGz2xKdPgEbtg" target="_blank" rel="noopener noreferrer">Pedir en Uber Eats ›</a></div>`;
let html = fs.readFileSync(file, 'utf8');
for(const [name,value] of [['catalog',cards],['featured',featured]]) {
 const start = `<!-- ${name}:start -->`, end = `<!-- ${name}:end -->`;
 const a = html.indexOf(start), b = html.indexOf(end);
 if (a < 0 || b < a) throw new Error(`Faltan marcadores: ${name}`);
 html = html.slice(0, a + start.length) + value + html.slice(b);
}
fs.writeFileSync(file, html);
console.log(`Catálogo estático actualizado: ${products.length} productos.`);
