import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

// function updateCartCount(count) {
//     document.querySelector('.cart_count').textContent = count;
// }

// updateCartCount(5);

//Newsletterbox
const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("newsletterMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
        return;
    }

    // Later: send to backend API
    message.style.color = "green";
    message.textContent = "Subscription successful! 🎉";

    emailInput.value = "";
});