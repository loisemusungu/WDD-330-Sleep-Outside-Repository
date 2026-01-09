import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get existing cart or start with empty array
  let cart = JSON.parse(localStorage.getItem("so-cart"));

  // If cart is not an array (e.g. null or object), reset it
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Add the new product
  cart.push(product);

  // Save back to localStorage
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
