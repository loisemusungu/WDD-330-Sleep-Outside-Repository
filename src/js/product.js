import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// --- Add to Cart Functionality ---
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get existing cart items or initialize empty array
  cartItems.push(product); // add new product to cart
  setLocalStorage("so-cart", cartItems); // update local storage
}

// --- Add to Cart button handler ---
async function addToCartHandler(e) {
  const productId = e.target.dataset.id;
  if (!productId) return;

  const dataSource = new ProductData("tents");
  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

// Attach listener to Add to Cart button
const addToCartBtn = document.getElementById("addToCart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", addToCartHandler);
}

// --- Product Details and Discount using HTML filename ---
const pathParts = window.location.pathname.split("/");
const filename = pathParts[pathParts.length - 1];          // e.g., "marmot-ajax-3.html"
const productSlug = filename.replace(".html", "").toLowerCase(); // "marmot-ajax-3"

const dataSource = new ProductData("tents");

async function initProductPage() {
  const products = await dataSource.getData();

  // Find product by matching slug property
  const product = products.find(p => p.Slug && p.Slug.toLowerCase() === productSlug);

  if (product) {
    // Initialize ProductDetails with the product's ID
    const productDetails = new ProductDetails(product.Id, dataSource);
    productDetails.init(); // renders product info, price, discount
  } else {
    console.error("No product found for this page! Check if the slug exists in your JSON");
  }
}

initProductPage();
