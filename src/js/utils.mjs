// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
} 

/**
 * Render a list of items into the DOM using a template function.
 * @param {Function} template - Function that returns an HTML string for a single item.
 * @param {HTMLElement} parentElement - The DOM element to insert the list into.
 * @param {Array} data - Array of items to render.
 * @param {Function} callback - Function to call after rendering.
 * @param {string} [position="afterbegin"] - Position for insertAdjacentHTML (default: "afterbegin").
 * @param {boolean} [clear=false] - Whether to clear the parentElement before rendering (default: false).
 */
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = false
) {
  if (callback) {
    callback(data);
  }
  // Clear existing content if requested
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Generate HTML strings for each item
  const htmlStrings = data.map(template);

  // Insert into the DOM at the specified position
  parentElement.insertAdjacentHTML(callback, position, htmlStrings.join(""));
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/src/partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("/src/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export async function loadProducts() {
  const res = await fetch("/src/data/products.json");
  const products = await res.json();
  return products;
}

export async function loadCart() {
  const res = await fetch("/src/data/cart.json");
  const cart = await res.json();
  return cart;
}

export function loadCheckout() {
  const res = fetch("/src/data/checkout.json");
  const checkout = res.json();
  return checkout;
}