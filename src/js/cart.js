import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".cart-list").innerHTML =
      "<p>Your cart is empty</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".cart-list").innerHTML = htmlItems.join("");
}

const SavedItemId = [];

function cartItemTemplate(item) {
  if (!item || !item.Images) {
    return ""; // Skip items that don't have required properties
  }
  if (SavedItemId.includes(item.Id)) {
    return "";
  } else {
    SavedItemId.push(item.id);
  }
    const euroPrice = new Intl.NumberFormat('de-DE',
      {
          style: 'currency', currency: 'EUR',
      }).format(Number(item.FinalPrice) * 0.85);

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <strong><p class="cart-card__quantity">qty: ${item.quantity}</p></strong>
  <p class="cart-card__price">${euroPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

