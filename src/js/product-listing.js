import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category"); // get category from URL
const dataSource = new ProductData(); // no category needed in constructor
const element = document.querySelector(".product-list")// get the list element
const listing = new ProductList(category, dataSource, element); // pass category to ProductList

listing.init();