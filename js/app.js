const products=[['Chimney azúcar y canela','4,90','chimney-azucar-canela','chimneys','EL CLÁSICO'],['Chimney cacao','5,60','chimney-cacao','chimneys','CHOCOLATE'],['Chimney coco','5,60','chimney-coco','chimneys','SUAVE'],['Chimney Lotus','6,20','chimney-lotus','chimneys','CARAMELO'],['Chimney pistacho','6,20','chimney-pistacho','chimneys','CRUJIENTE'],['Chimney nuez','6,20','chimney-nuez','chimneys','PARA REPETIR'],['Pack 2','11,50','pack-2','packs','PARA COMPARTIR'],['Pack 4','22,00','pack-4','packs','MÁS BUEN ROLLO'],['Pack 6','32,00','pack-6','packs','EN BUENA COMPAÑÍA'],['Roll + café','7,50','combo-roll-cafe','packs','EL COMBO'],['Roll + chocolate caliente','8,00','combo-roll-chocolate-caliente','packs','EL COMBO'],['Chocolate caliente','3,50','chocolate-caliente-220ml','bebidas','220 ML'],['Café expreso','1,80','cafe-expreso','bebidas','RECIÉN HECHO'],['Cortado','1,80','cafe-cortado','bebidas','RECIÉN HECHO'],['Americano','1,80','cafe-americano','bebidas','RECIÉN HECHO'],['Capuccino','1,80','cafe-capuccino','bebidas','RECIÉN HECHO'],['Café con leche','1,80','cafe-con-leche','bebidas','RECIÉN HECHO'],['Agua','1,50','agua','bebidas','REFRESCANTE'],['Coca-Cola','1,80','coca-cola','bebidas','REFRESCANTE'],['Fanta limón','1,80','fanta-limon','bebidas','REFRESCANTE'],['Fanta naranja','1,80','fanta-naranja','bebidas','REFRESCANTE'],['Nestea','1,80','nestea','bebidas','REFRESCANTE'],['Aquarius','1,80','aquarius','bebidas','REFRESCANTE'],['Cacaolat','1,80','cacaolat','bebidas','REFRESCANTE']];
const grid=document.querySelector('#products');
const featured=document.querySelector('#featured-product');
const order='https://www.ubereats.com/es-en/store/buen-rollito-chimney/FR-O0IdEUKGz2xKdPgEbtg';
const colors=['#f6c5cc','#cce5c7','#ffe5a7','#c4e7e3','#e7d5ed'];
function selectProduct(id){
 const product=products.find(p=>p[2]===id); if(!product)return;
 featured.innerHTML=`<div class="featured-image"><span class="featured-label">${product[4]}</span><img src="productos/${product[2]}.png" alt="${product[0]}"></div><div class="featured-info"><div><span class="featured-kicker">TU ELECCIÓN</span><h3>${product[0]}</h3><p>${product[1]} €</p></div><a class="button dark" href="${order}" target="_blank" rel="noopener noreferrer">Pedir en Uber Eats ↗</a></div>`;
 grid.querySelectorAll('button').forEach(button=>{const selected=button.dataset.product===id;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('selected',selected)});
}
function render(filter){
 const visible=products.filter(p=>filter==='todos'||p[3]===filter);
 grid.innerHTML=visible.map((p,i)=>`<button type="button" class="product-option" data-product="${p[2]}" aria-pressed="false" style="--card:${colors[i%colors.length]}"><span class="option-image"><img src="productos/${p[2]}.png" alt="" loading="lazy"></span><span class="option-name">${p[0]}<small>${p[1]} €</small></span><span class="option-arrow" aria-hidden="true">↗</span></button>`).join('');
 grid.scrollTop=0;grid.scrollLeft=0;selectProduct(visible[0][2]);
}
grid.addEventListener('click',event=>{const button=event.target.closest('[data-product]');if(button)selectProduct(button.dataset.product)});
render('todos');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});button.classList.add('active');button.setAttribute('aria-pressed','true');render(button.dataset.filter)}));
const track=document.querySelector('#review-track');document.querySelector('#prev-review').addEventListener('click',()=>track.scrollBy({left:-340,behavior:'smooth'}));document.querySelector('#next-review').addEventListener('click',()=>track.scrollBy({left:340,behavior:'smooth'}));const loader=document.querySelector('#loader');window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),900));setTimeout(()=>loader.classList.add('done'),3000);if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.intro,.section-heading,.manifesto-copy,.reviews-top,.visit-copy').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}

// El ancho del encabezado sigue el progreso del desplazamiento.
const header=document.querySelector('.header');
const headerPill=header.querySelector('.header-pill');
const headerBrand=header.querySelector('.brand');
let headerFrame=null;
function updateHeader(){
 const progress=Math.min(Math.max(window.scrollY/220,0),1);
 const mobile=window.innerWidth<=800;
 const inset=mobile?16:Math.max(40,window.innerWidth*.06);
 const fullWidth=Math.max(0,window.innerWidth-inset);
 const compactWidth=Math.min(fullWidth, mobile?fullWidth:680);
 headerPill.style.width=(fullWidth+(compactWidth-fullWidth)*progress)+'px';
 headerPill.style.minHeight=((mobile?58:78)-(mobile?3:9)*progress)+'px';
 const logoSize=(mobile?48:62)-(mobile?3:5)*progress;
 headerBrand.style.width=logoSize+'px';
 headerBrand.style.height=logoSize+'px';
 headerFrame=null;
}
function scheduleHeaderUpdate(){if(headerFrame===null)headerFrame=requestAnimationFrame(updateHeader)}
window.addEventListener('scroll',scheduleHeaderUpdate,{passive:true});
window.addEventListener('resize',scheduleHeaderUpdate);
updateHeader();
