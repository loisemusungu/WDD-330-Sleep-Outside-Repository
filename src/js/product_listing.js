import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "tents";
}

const category = getCategoryFromURL();

// Update heading
document.getElementById("category-title").textContent =
  category.charAt(0).toUpperCase() + category.slice(1);

// Create data source
const dataSource = new ProductData(category);

// Create product list
const productList = new ProductList(
  category,
  dataSource,
  document.querySelector(".product-list")
);

// Load products
productList.init();