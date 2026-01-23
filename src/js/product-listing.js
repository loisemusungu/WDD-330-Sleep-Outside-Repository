import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const listElement = document.querySelector("#productList");

const productList = new ProductList("tents", dataSource, listElement);

async function start() {
  await productList.init();

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

start();
