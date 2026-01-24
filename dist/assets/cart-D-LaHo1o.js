import{l as e,g as o}from"./utils-CYBK5NaT.js";/* empty css              */function n(){const a=o("so-cart")||[],r={};a.forEach(t=>{const c=t.Id;r[c]?r[c].count+=1:r[c]={item:t,count:1}});const s=Object.values(r).map(({item:t,count:c})=>l(t,c));document.querySelector(".product-list").innerHTML=s.join("")}function l(a,r){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <strong><span class="qty">${r}</span></strong></p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}n();e();
