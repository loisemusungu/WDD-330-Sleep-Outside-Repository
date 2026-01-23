// function to generate HTML for a single product card
function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/?product=${encodeURIComponent(product.NameWithoutBrand)}">
          <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
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
  