import{r,d as c}from"./utils-gDy85w4W.js";import{P as i}from"./ProductData-Dx0C3TkS.js";function n(t){return`
    <li class="product-card">
        <a href="product_pages/?product=${t.Id}">
        <img src="${t.Image}" alt="Image of ${t.Name}"/>
        <h3 class="card__brand">${t.Brand.Name}</h3>
        <h2 class="card__name">${t.NameWithoutBrand}</h2>
        <p class="product-card__price">$${t.FinalPrice}</p>
        </a>
    </li>`}class o{constructor(a,e,s){this.category=a,this.dataSource=e,this.listElement=s}async init(){const a=await this.dataSource.getData();this.renderList(a.slice(0,4))}renderList(a){r(n,this.listElement,a)}}const l=new i("tents"),d=document.querySelector(".product-list"),m=new o("tents",l,d);m.init();c(".count","so-cart");
