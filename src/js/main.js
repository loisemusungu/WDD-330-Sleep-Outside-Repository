// import ExternalServices from "./ExternalServices.mjs";
// import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Newsletter from "./newsletter.mjs";

loadHeaderFooter();

const newsletter = new Newsletter();
newsletter.init();

// const dataSource = new ExternalServices("tents");

// const element = document.querySelector(".product-list");

// const productList = new ProductList("Tents", dataSource, element);

// productList.init();

// function updateCartCount(count) {
//     document.querySelector('.cart_count').textContent = count;
// }

// updateCartCount(5);
