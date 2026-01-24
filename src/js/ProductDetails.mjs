import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);

    // Render product details
    this.renderProductDetails();
    
    // Add listener to the Add to Cart button
    const addBtn = document.getElementById('addToCart');
    if (addBtn) {
      addBtn.addEventListener('click', this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

// Template function to render product details and discount
function productDetailsTemplate(product) {
  console.log("Product object:", product);

  // Brand and product name
  const h2 = document.querySelector('h2');
  const h3 = document.querySelector('h3');
  if (h2) h2.textContent = product.NameWithoutBrand;
  if (h3) h3.textContent = product.Brand?.Name || "";

  // Product image
  const productImage = document.getElementById('productImage');
  if (productImage) {
    productImage.src = product.PrimaryLarge?.Url;
    productImage.alt = product.NameWithoutBrand;
  }

  // Prices
  const priceEl = document.getElementById('productPrice');
  const discountEl = document.getElementById('productDiscount');

  if (priceEl) priceEl.textContent = `$${product.FinalPrice.toFixed(2)}`;
  if (discountEl) {
    const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
    const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);

    console.log("SuggestedRetailPrice:", product.SuggestedRetailPrice);
    console.log("FinalPrice:", product.FinalPrice);
    console.log("DiscountAmount:", discountAmount, "DiscountPercent:", discountPercent);

    if (discountAmount > 0) {
      discountEl.textContent = `Save $${discountAmount.toFixed(2)} (${discountPercent}% off)`;
      discountEl.style.color = "red";
      discountEl.style.fontWeight = "bold";
    } else {
      discountEl.textContent = "";
    }
  }

  // Other details
  const colorEl = document.getElementById('productColor');
  const descEl = document.getElementById('productDesc');

  if (colorEl && product.Colors.length > 0) colorEl.textContent = product.Colors[0].ColorName;
  if (descEl) descEl.innerHTML = product.DescriptionHtmlSimple || "";

  // Set Add to Cart button data
  const addBtn = document.getElementById('addToCart');
  if (addBtn) addBtn.dataset.id = product.Id;
}
