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
import { getLocalStorage, setLocalStorage , displayCount} from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];

        //Fine idea but won't stop the page from displaying an item more than one time
        const existingItem = cartItems.find(item => item.Id === this.product.Id);
        if (existingItem) {
            existingItem.quantity += 1;
            //console.log(`Increased quantity of ${existingItem.Name} to ${existingItem.quantity}`);
        } else {
            this.product.quantity = 1;
            cartItems.push(this.product);
        }
        setLocalStorage("so-cart", cartItems);

        //To update de superscript after each addition to cart
        displayCount(".cart_count", "so-cart");
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#p-image");
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    const euroPrice = new Intl.NumberFormat('de-DE',
        {
            style: 'currency', currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85);

    document.querySelector("#p-price").textContent = `${euroPrice} EUR`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#addToCart").dataset.id = product.Id;
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }

//******************************************************** */
// Alternative method to increase the quantity of the product
// The goal was to avoid modifying the data of the product
// { From : Schnaider Jean Louis }
//   const group = {};
//   cartItems.forEach((item) => {
//     const id = item.Id;
//     if (!group[id]) {
//       group[id] = { item, count: 1 };
//     } else {
//       group[id].count += 1;
//     }
//   });

// Alternative renderProductDetails method 
// { From :  Schnaider Jean Louis }
    // renderProductDetails() {
    //     const productDetailsContainer = document.querySelector(".product-detail");
    //     const clone = productDetailsContainer.cloneNode(true);
    //     productDetailsContainer.innerHTML = "";
    //     const [h3, h2, img, price, color, desc] = clone.querySelectorAll("h3, h2, img, p, p, p");
    //     const addBtn = clone.querySelector("div.product-detail__add > #addToCart");
    //     h3.textContent = this.product.Brand.Name;
    //     h2.textContent = this.product.NameWithoutBrand;
    //     img.src = this.product.Image;
    //     img.alt = `${this.product.Name} Image`;
    //     price.textContent = `$${this.product.FinalPrice}`;
    //     color.textContent = this.product.Colors[0].ColorName;
    //     desc.innerHTML = this.product.DescriptionHtmlSimple;
    //     addBtn.dataset.id = this.productID;
    //     //The clone is not rendered yet so I need to append it to the container first
    //     productDetailsContainer.replaceWith(clone)
    // }
