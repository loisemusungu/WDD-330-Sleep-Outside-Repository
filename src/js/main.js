import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// select the HTML element where products will be displayed
const listElement = document.querySelector("#productList");

// create a ProductList instance
const productList = new ProductList("tents", dataSource, listElement);

// function to load and render products
async function start() {
  // fetch products from the data source
  await productList.init();

  // render the products inside the target element
  listElement.innerHTML = productList.products
    .map((item) => `
      <section class="product-card">
        <h3>${item.Name}</h3>
        <img src="${item.Image}" alt="${item.Name}">
        <p>${item.DescriptionHtmlSimple}</p>
        <p class="price">$ ${item.FinalPrice}</p>
      </section>
    `)
    .join("");
}

// start the process
start();
