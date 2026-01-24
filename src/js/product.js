import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// --- Add to Cart Functionality ---
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// --- Add to Cart button handler ---
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) return;

  const dataSource = new ProductData();
  const product = await dataSource.findProductById(productId);
  if (product) addProductToCart(product);
}

// Attach listener to Add to Cart button
document.getElementById("addToCart")?.addEventListener("click", addToCartHandler);

// --- Product Details ---
const productId = getParam("id"); // get product ID from URL
const dataSource = new ProductData();

async function initProductPage() {
  if (!productId) {
    console.error("No product ID in URL");
    return;
  }

  // Initialize ProductDetails with the product ID and data source
  const productDetails = new ProductDetails(productId, dataSource);
  await productDetails.init(); // renders product info and sets up Add to Cart
}

// Start the product page
initProductPage();
