import{r as s,l as i,a as c}from"./utils-C-RgQSnL.js";import{E as o}from"./ExternalServices-D0VG2S6o.js";function n(t){return`
    <li class="product-card">
      <a href="/product_pages/?product=${t.Id}">
        <img src="${t.Images.PrimaryMedium}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class l{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").textContent=this.category}renderList(e){s(n,this.listElement,e)}}i();const m=c("category"),d=new o,h=document.querySelector(".product-list"),u=new l(m,d,h);u.init();
