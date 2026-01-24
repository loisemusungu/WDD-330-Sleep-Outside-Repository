import{l as c,g as n}from"./utils-BpaklinI.js";/* empty css              */function o(){const r=n("so-cart")||[];if(r.length===0){document.querySelector(".product-list").innerHTML="<p>Your cart is empty</p>";return}const a=r.map(e=>s(e));document.querySelector(".product-list").innerHTML=a.join("")}const t=[];function s(r){return!r||!r.Image||t.includes(r.Id)?"":(t.push(r.id),`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${r.Image}"
      alt="${r.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${r.Name}</h2>
  </a>
  <p class="cart-card__color">${r.Colors[0].ColorName}</p>
  <strong><p class="cart-card__quantity">qty: ${r.quantity}</p></strong>
  <p class="cart-card__price">$${r.FinalPrice}</p>
</li>`)}o();c();
