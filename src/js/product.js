import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

//create an instance of productData class with the URL it should use to look for product
const dataSource = new ProductData("tents");

//Get the product ID from the query string URL
const productID = getParam("product");

//Use the two variables to create an instance of the ProductDetails class
const product = new ProductDetails(productID, dataSource);

//Call the init method of the class
product.init();
