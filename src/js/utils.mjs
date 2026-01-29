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
 * @param {Function} templateFn - Function that returns an HTML string for a single item.
 * @param {HTMLElement} parentElement - The DOM element to insert the list into.
 * @param {Array} list - Array of items to render.
 * @param {string} [position="afterbegin"] - Position for insertAdjacentHTML (default: "afterbegin").
 * @param {boolean} [clear=false] - Whether to clear the parentElement before rendering (default: false).
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  // Clear existing content if requested
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Generate HTML strings for each item
  //const htmlStrings = list.map(templateFn);

  // Insert into the DOM at the specified position
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {

  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  //header
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");

  //footer
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  //Call this function each time loadHeaderFooter run to keep the superscript number updated
  displayCount(".cart_count", "so-cart");
}

//Add a superscript number of items in the cart to the backpack icon.
export function displayCount(element, storageKey) {
  const el = document.querySelector(element);
  const storage = getLocalStorage(storageKey);
  let total = 0;
  for (const i of storage) {
    total += i.quantity
  }
  el.textContent = total ? total : 0;
  console.log(el)
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert");
  alertDiv.innerHTML = `<p>${message}</p><span>X</span>`;

  alertDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  main.prepend(alertDiv);
  
  if(scroll) window.scrollTo(0,0);
}

export function removeAllAlerts() { 
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}