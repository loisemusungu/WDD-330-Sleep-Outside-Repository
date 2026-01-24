import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// add to cart
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) return;

  const dataSource = new ProductData();
  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

document.getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);

// product details
const productId = getParam("id");
const dataSource = new ProductData();

async function initProductPage() {
  if (!productId) {
    console.error("No product ID in URL");
    return;
  }

  const productDetails = new ProductDetails(productId, dataSource);
  productDetails.init();
}

initProductPage();
