import{r,l as i}from"./utils-CYBK5NaT.js";/* empty css              */import{P as c}from"./ProductData-Dx0C3TkS.js";function n(t){return`
    <li class="product-card">
        <a href="product_pages/?product=${t.Id}">
        <img src="${t.Image}" alt="Image of ${t.Name}"/>
        <h3 class="card__brand">${t.Brand.Name}</h3>
        <h2 class="card__name">${t.NameWithoutBrand}</h2>
        <p class="product-card__price">$${t.FinalPrice}</p>
        </a>
    </li>`}class o{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData();this.renderList(e.slice(0,4))}renderList(e){r(n,this.listElement,e)}}const l=new c("tents"),d=document.querySelector(".product-list"),m=new o("tents",l,d);m.init();i();
