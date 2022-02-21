window.addEventListener('DOMContentLoaded', ()=>{
    const links = document.querySelectorAll("a");
    
    for (const link of links) {
        link.addEventListener("click", clickHandler);
    }
    
    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        
        document.querySelector(href).scrollIntoView({
            behavior: "smooth"
        });
    }
});