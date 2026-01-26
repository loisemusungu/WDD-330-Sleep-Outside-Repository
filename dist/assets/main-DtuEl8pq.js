import{r as o}from"./utils-BefCnjyS.js";function c(t){if(t.ok)return t.json();throw new Error("Bad Response")}class i{constructor(e){this.category=e,this.path=`/json/${this.category}.json`}getData(){return fetch(this.path).then(c).then(e=>e)}async findProductById(e){return(await this.getData()).find(s=>s.Id===e)}}function l(t){return`
    <li class="product-card">
      <a href="product_pages/?product=${t.Id}">
        <img src="${t.Image}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class d{constructor(e,r,s){this.category=e,this.dataSource=r,this.listElement=s}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e){o(l,this.listElement,e)}}function u(){const e=(JSON.parse(localStorage.getItem("so-cart"))||[]).length;document.querySelector(".cart_count").textContent=e}u();const m=new i("tents"),h=document.querySelector(".product-list"),g=new d("Tents",m,h);g.init();const p=document.getElementById("newsletterForm"),a=document.getElementById("email"),n=document.getElementById("newsletterMessage");p.addEventListener("submit",function(t){if(t.preventDefault(),!a.value.trim()){n.style.color="red",n.textContent="Please enter a valid email address.";return}n.style.color="green",n.textContent="Subscription successful! 🎉",a.value=""});
