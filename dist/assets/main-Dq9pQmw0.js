import{r as s,l as i,d as c}from"./utils-BpaklinI.js";/* empty css              */import{P as n}from"./ProductData-ckpWzqDt.js";function o(t){return`
    <li class="product-card">
      <a href="product_pages/?product=${t.Id}">
        <img src="${t.Image}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class d{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData();this.renderList(e.slice(0,4))}renderList(e){s(o,this.listElement,e)}}const l=new n("tents"),m=document.querySelector(".product-list"),u=new d("Tents",l,m);u.init();i();document.addEventListener("DOMContentLoaded",c("cart_count","so-cart"));
