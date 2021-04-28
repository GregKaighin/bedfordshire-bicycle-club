// Credit: Back to top button help from: https://css-tricks.com/how-to-make-an-unobtrusive-scroll-to-top-button/

// Back to top button:
let backToTop = document.getElementById("back-top-btn");

let pageTop = document.documentElement;

function scrollToTop() {
    pageTop.scrollTo({
        top: 0, // Top of webpage
        behaviour: "smooth" // Smooth scroll back to the top
    });
}

backToTop.addEventListener("click", scrollToTop);