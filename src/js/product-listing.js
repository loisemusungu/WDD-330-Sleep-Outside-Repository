import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

// get the category from the url
const category = getParam('category');

// Format category for display (capitalize each word and replace dashes with spaces)
const formattedCategory = category
  .split('-')
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(' ');

// Update page title and main heading
const pageTitle = document.querySelector('title');
const heading = document.querySelector('h1');
if (pageTitle) pageTitle.textContent = `Top Products: ${formattedCategory}`;
if (heading) heading.textContent = `Top Products: ${formattedCategory}`;

// create the data source
const dataSource = new ProductData();

// find the element where the list will show
const listElement = document.querySelector('#product-list');

// create the product list
const myList = new ProductList(category, dataSource, listElement);

// load products
myList.init();
