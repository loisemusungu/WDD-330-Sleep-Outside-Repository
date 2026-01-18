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
  const product = searchParam.get("product");
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

export function displayCount(element, key) {
  const el = document.querySelector(element);
  const storage = getLocalStorage(key);

  const count = storage ? storage.length : 0;
  el.textContent = count;
}

