/* main.js */

// taken from: https://webdesign.tutsplus.com/tutorials/smooth-scrolling-vanilla-javascript--cms-35165
window.addEventListener('DOMContentLoaded', ()=>{
    const links = document.getElementsByClassName('on-page-link');
    
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