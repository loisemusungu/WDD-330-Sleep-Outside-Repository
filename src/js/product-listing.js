import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category"); // get category from URL
const dataSource = new ExternalServices(); // no category needed in constructor
const element = document.querySelector(".product-list"); // get the list element
const listing = new ProductList(category, dataSource, element); // pass category to ProductList

listing.init();
