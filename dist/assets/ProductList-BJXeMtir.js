import{r as o}from"./utils-Da9t4Hyi.js";const s="https://wdd330-backend.onrender.com/";function c(t){if(t.ok)return t.json();throw new Error("Bad Response")}class l{constructor(e){}async getData(e){const a=await fetch(`${s}/products/search/${e}`);return(await c(a)).Result}async findProductById(e){const a=await fetch(`${s}/product/${e}`),r=await c(a);return console.log(r.Result),r.Result}}function n(t){return`
    <li class="product-card">
      <a href="product_pages/?product=${t.Id}">
        <img src="${t.Image}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class u{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").textContent=this.category}renderList(e){o(n,this.listElement,e)}}function i(){const e=(JSON.parse(localStorage.getItem("so-cart"))||[]).length;document.querySelector(".cart_count").textContent=e}i();export{u as P,l as a};
