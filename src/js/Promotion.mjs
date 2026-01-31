import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class Newsletter {
    constructor() {
        this.form = document.getElementById("newsletter-form");
        this.subMsg = document.getElementById("sub-msg");
    }
    init() {
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.subMsg.style.display = "none";
    }   
    handleSubmit(event) {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim(); 
        let subscribers = getLocalStorage("subscribers") || [];
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            setLocalStorage("subscribers", subscribers);
        }

        this.form.style.display = "none";

        this.subMsg.style.display = "block";
        
    }
}
// Promotional dialog functionality

const promoKey = "promoSeen";

export function promoModal() {
    const promoDialog = document.getElementById("wlc-promo");
    const registerBtn = document.getElementById("btn-register");
    const dismissBtn = document.getElementById("btn-dismiss");

    if (!promoDialog) return;
    
    function showPromoAtFirstVisit() {
        const promoSeen = localStorage.getItem(promoKey);
        if (!promoSeen) {
            promoDialog.showModal();
        }
    }

    function closePromo() {
        setLocalStorage(promoKey, "true");
        promoDialog.close();
    }

    dismissBtn?.addEventListener("click", closePromo);

    registerBtn?.addEventListener("click", () => {
        //window.location.href = "/register.html";
        promoDialog.close();
    });

    showPromoAtFirstVisit();

   
}