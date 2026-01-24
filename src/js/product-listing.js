import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// get the category from the url
const category = getParam('category');

// create the data source
const dataSource = new ProductData();

// find the element where the list will show
const listElement = document.querySelector('.product-list');

// create the product list
const myList = new ProductList(category, dataSource, listElement);

// load products
myList.init();
