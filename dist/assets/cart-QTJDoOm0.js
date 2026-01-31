import{l as v,g as d,s as c,d as u}from"./utils-d2So7emT.js";v();function i(){const t=d("so-cart")||[];if(t.length===0){document.querySelector(".cart-list").innerHTML="<p>Your cart is empty</p>";return}const e=t.map(r=>y(r));document.querySelector(".cart-list").innerHTML=e.join("")}const m=[];function y(t){if(!t||!t.Images||m.includes(t.Id))return"";m.push(t.id);const e=new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(Number(t.FinalPrice*t.quantity)*.85);return`<li class="cart-card divider">
  <div class = "productContainer">
    <a href="#" class="cart-card__image">
      <img
        src="${t.Images.PrimarySmall}"
        alt="${t.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <strong><p class="cart-card__quantity">qty: ${t.quantity}</p></strong>
    <p class="cart-card__price">${e}</p>
  </div>
  <div class="remove">
    <button class="removeBtn" data-id = "${t.Id}"></button>
  </div>

</li>`}document.querySelector(".cart-list").addEventListener("click",t=>{if(t.target&&t.target.classList.contains("removeBtn")){const e=t.target.dataset.id;g(e)}});function g(t,e="so-cart"){const r=d(e)||[],o=r.find(a=>a.Id===t);if(o){if(o.quantity>1){const a=document.createElement("dialog");a.innerHTML=` 
    <form method="dialog">
      <p>You currently have multiple quantities of this item in your cart.</p>
      <label for="number">How many would you like to remove?</label>
      <input type="number" id="number" min="1" max="${o.quantity}" value="1" name="quantity"> 
      <menu> 
        <button value="cancel">Cancel</button>
        <button id="confirm" value="confirm">Remove</button> 
      </menu> 
    </form>     
    `,document.querySelector("main").appendChild(a);const n=a.querySelector('input[type="number"]');a.querySelector("#confirm").addEventListener("click",()=>{n.value<n.min&&(n.value=n.min),n.value>n.max&&(n.value=n.max);const l=parseInt(n.value,10);if(l>=o.quantity){const f=r.filter(p=>p.Id!==t);c(e,f)}else o.quantity-=l,c(e,r);u(".cart_count","so-cart"),i(),a.close()}),a.showModal()}else{const a=r.filter(s=>s.Id!==t);c(e,a)}i(),u(".cart_count","so-cart")}}i();
