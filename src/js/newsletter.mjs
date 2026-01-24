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