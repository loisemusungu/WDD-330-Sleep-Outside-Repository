import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { displayCount } from "./utils.mjs";
export default class ProductDetails {

    //The constructor will keep track of information about itself
    constructor(productID, dataSource) {
        this.productID = productID;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {

        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it 
        this.product = await this.dataSource.findProductById(this.productID);

        // the product details are needed before rendering the HTML
        this.renderProductDetails();

        // once the HTML is rendered, add a listener to the Add to Cart button
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
    //addProductToCart(product)
    //No need for parameter here because the product is present in the class
    
    addProductToCart() {   
        let newProduct = getLocalStorage("so-cart") || []; // get existing cart or initialize empty array

        newProduct.push(this.product); // add product to cart array

        setLocalStorage("so-cart", newProduct); // save updated cart to local storage
        
        displayCount(".count", "so-cart");
    }

    renderProductDetails() {

        const productDetailsContainer = document.querySelector(".product-detail");
        const clone = productDetailsContainer.cloneNode(true);
        productDetailsContainer.innerHTML = "";
        const [h3, h2, img, price, color, desc] = clone.querySelectorAll("h3, h2, img, p, p, p");
        const addBtn = clone.querySelector("div.product-detail__add > #addToCart");

        h3.textContent = this.product.Brand.Name;
        h2.textContent = this.product.NameWithoutBrand;
        img.src = this.product.Image;
        img.alt = `${this.product.Name} Image`;
        price.textContent = `$${this.product.FinalPrice}`;
        color.textContent = this.product.Colors[0].ColorName;
        desc.innerHTML = this.product.DescriptionHtmlSimple;

        addBtn.dataset.id = this.productID;

        //The clone is not rendered yet so I need to append it to the container first
        productDetailsContainer.replaceWith(clone)
    }
}