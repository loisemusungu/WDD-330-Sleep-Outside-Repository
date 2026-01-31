import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
  displayCount,
} from "./utils.mjs";

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
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(item.FinalPrice * item.quantity) * 0.85);

  const newItem = `<li class="cart-card divider">
  <div class = "productContainer">
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
  </div>
  <div class="remove">
    <button class="removeBtn" data-id = "${item.Id}"></button>
  </div>

</li>`;

  return newItem;
}

// Event delegation: listen on the parent (.cart-list) instead of each button.
// Clicks bubble up, so we check if event.target is a .removeBtn and handle it.
document.querySelector(".cart-list").addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("removeBtn")) {
    const datasetId = e.target.dataset.id;
    removeItemFromCart(datasetId);
  }
});

function removeItemFromCart(itemId, storageKey = "so-cart") {
  const storage = getLocalStorage(storageKey) || [];
  const item = storage.find((itm) => itm.Id === itemId);
  if (!item) return;

  if (item.quantity > 1) {
    const dialogBox = document.createElement("dialog");

    dialogBox.innerHTML = ` 
    <form method="dialog">
      <p>You currently have multiple quantities of this item in your cart.</p>
      <label for="number">How many would you like to remove?</label>
      <input type="number" id="number" min="1" max="${item.quantity}" value="1" name="quantity"> 
      <menu> 
        <button value="cancel">Cancel</button>
        <button id="confirm" value="confirm">Remove</button> 
      </menu> 
    </form>     
    `;
    const main = document.querySelector("main");
    main.appendChild(dialogBox);

    const input = dialogBox.querySelector("input[type=\"number\"]");
    const confirmationBtn = dialogBox.querySelector("#confirm");

    confirmationBtn.addEventListener("click", () => {
      if (input.value < input.min) input.value = input.min;
      if (input.value > input.max) input.value = input.max;
      const toRemove = parseInt(input.value, 10);
      if (toRemove >= item.quantity) {
        //if the user wants to remove all
        const newStorage = storage.filter((i) => i.Id !== itemId);
        setLocalStorage(storageKey, newStorage);
      } else {
        item.quantity -= toRemove;
        setLocalStorage(storageKey, storage);
      }
      displayCount(".cart_count", "so-cart");
      renderCartContents();
      dialogBox.close();
    });
    dialogBox.showModal();
  } else {
    const newStorage = storage.filter((i) => i.Id !== itemId);
    setLocalStorage(storageKey, newStorage);
  }
  renderCartContents();
  displayCount(".cart_count", "so-cart");
}

renderCartContents();
