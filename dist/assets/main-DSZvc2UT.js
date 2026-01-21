import{r as s}from"./utils-Gqkk3m-O.js";import{P as c}from"./ProductData-ckpWzqDt.js";function n(t){return`
    <li class="product-card">
      <a href="product_pages/?product=${t.Id}">
        <img src="${t.Image}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class o{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e){s(n,this.listElement,e)}}function i(){const e=(JSON.parse(localStorage.getItem("so-cart"))||[]).length;document.querySelector(".cart_count").textContent=e}i();const l=new c("tents"),d=document.querySelector(".product-list"),m=new o("Tents",l,d);m.init();
