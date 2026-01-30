import{l as c,g as n}from"./utils-C-RgQSnL.js";c();function s(){const r=n("so-cart")||[];if(r.length===0){document.querySelector(".cart-list").innerHTML="<p>Your cart is empty</p>";return}const a=r.map(e=>o(e));document.querySelector(".cart-list").innerHTML=a.join("")}const t=[];function o(r){if(!r||!r.Images||t.includes(r.Id))return"";t.push(r.id);const a=new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(Number(r.FinalPrice)*.85);return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${r.Images.PrimarySmall}"
      alt="${r.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${r.Name}</h2>
  </a>
  <p class="cart-card__color">${r.Colors[0].ColorName}</p>
  <strong><p class="cart-card__quantity">qty: ${r.quantity}</p></strong>
  <p class="cart-card__price">${a}</p>
</li>`}s();
