// function to generate HTML for a single product card
function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/?product=${encodeURIComponent(product.NameWithoutBrand)}">
        <img src="${product.PrimaryMedium?.Url}" alt="Image of ${product.NameWithoutBrand}">
          <h2 class="card__brand">${product.Brand.Name}</h2>
          <h3 class="card__name">${product.NameWithoutBrand}</h3>
          <p class="product-card__price">Ksh ${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }
  
  export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.products = [];
    }
  
    async init() {
      // fetch products from the data source
      const list = await this.dataSource.getData(this.category);
      
      this.products = list;
      // render the list after fetching
      this.renderList(this.products);
    }
  
    renderList(products) {
      // generate HTML for each product and join them
      const html = products.map(productCardTemplate).join("");
      // insert the HTML into the DOM
      this.listElement.innerHTML = html;
    }
  }
  
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);

    }

}
//This function has no use anymore
// function updateCartBadge() {
//     const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
//     const count = cartItems.length;
//     document.querySelector('.cart_count').textContent = count;
// }
// updateCartBadge();

//This function should be in ProductDetails.mjs
// function addToCart(product) {
//     let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
//     cart.push(product);
//     localStorage.setItem("so-cart", JSON.stringify(cart));
//     updateCartBadge();
// }
// export { addToCart };
