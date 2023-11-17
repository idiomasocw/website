
    const toggleButton = document.getElementsByClassName('menu-toggle')[0];
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    const menuContainer = document.getElementsByClassName('menu')[0];

    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
        menuContainer.classList.toggle('active');
    });
    console.log("Menu Function called")

    /* HAMBURGER ICON ANIMATION */
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', ()=>{
        if (!menuOpen){
            menuBtn.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            menuOpen = false;
        }
    });
}

/* ACCORDION CODE */
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        // Toggle the "active" class for the arrow indicator
        this.classList.toggle("active");
        
        // Toggle the content visibility using maxHeight
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    let isMobile = window.innerWidth < 868; // Adjust this value based on your design's mobile breakpoint

    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 2.5 &&
            rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) / 6
        );
    };

    const runOnScroll = () => {
        if (isMobile) {
            cards.forEach(card => {
                if (isInViewport(card)) {
                    card.classList.add('hover-effect');
                } else {
                    card.classList.remove('hover-effect');
                }
            });
        }
    };

    // Add or remove scroll listener based on screen width
    const checkScreenWidth = () => {
        isMobile = window.innerWidth < 868;
        if (isMobile) {
            window.addEventListener('scroll', runOnScroll);
        } else {
            window.removeEventListener('scroll', runOnScroll);
            cards.forEach(card => card.classList.remove('hover-effect'));
        }
    };

    // Initial check
    checkScreenWidth();

    // Check on resize
    window.addEventListener('resize', checkScreenWidth);
});


