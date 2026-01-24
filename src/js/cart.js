import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const group = {};
  cartItems.forEach((item) => {
    const id = item.Id;
    if (!group[id]) {
      group[id] = { item, count: 1 };
    } else {
      group[id].count += 1;
    }
  });
  //transform the Objet "group" ino an array of it values
  //this allowed me to use map()
  //And transform them into Html via cartItemTemplate()
  const htmlItems = Object.values(group).map(({ item, count }) =>
    cartItemTemplate(item, count),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, quantity) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <strong><span class="qty">${quantity}</span></strong></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
