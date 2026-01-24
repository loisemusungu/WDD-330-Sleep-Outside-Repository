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
  const searchParam = new URLSearchParams(queryString);
  const product = searchParam.get(param);
  return product;

}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {

  if (clear) {
    parentElement.innerHTML = "";
  }
  //map transform each product to an array of HTML Strings
  const htmlStrings = list.map(templateFn);

  //insertAdjacentHTML("") is a DOM method use to insert html code as a string
  parentElement.insertAdjacentHTML(position,  htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data = null, callback) {

  //insertAdjacentHTML("") is a DOM method use to insert html code as a string
  parentElement.innerHTML = template;

  if (callback) {
    callback();
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;

}

export async function loadHeaderFooter() {
  //header
  const headerTemplate = await loadTemplate("/partials/header.html");
  const headerElement = document.querySelector("#main-header");

  //footer
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  displayCount(".count", "so-cart");

}

export function displayCount(element, storageKey) {
  const el = document.querySelector(element);
  const storage = getLocalStorage(storageKey);

  const count = storage ? storage.length : 0;
  el.textContent = count;
}

