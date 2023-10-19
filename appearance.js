document.addEventListener("DOMContentLoaded", function() {
    const menuSection = document.querySelector("#menu-section");
    const matriculateButton = document.querySelector(".matriculate-button a");

    // Initialize to the intended starting position
    matriculateButton.style.top = "-10px";
    matriculateButton.style.marginTop = "-10px";
    
    let lastKnownScrollPosition = 0;
    let shouldShowMenu = true;

    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;
        
        // Add sticky class and adjust top position
        if (scrollPosition > 50 && scrollPosition < 500) {
            shouldShowMenu = true;
            menuSection.classList.add("menu-section-sticky");
        } 
        // Condition to hide the menu after 800px
        else if (scrollPosition >= 500) {
            shouldShowMenu = false;
            menuSection.classList.remove("menu-section-sticky");
        }
        
        // Show the regular menu when scrolling up to the top
        if (scrollPosition === 0) {
            shouldShowMenu = true;
            menuSection.classList.remove("menu-section-sticky");
            matriculateButton.style.top = "-10px";  // Restore initial top position
            matriculateButton.style.marginTop = "-10px";  // Restore initial margin-top
        } 
        // Show the sticky menu when scrolling down from the top
        else if (scrollPosition > 0 && scrollPosition < 50) {
            menuSection.classList.add("menu-section-sticky");
            matriculateButton.style.top = "0";  // Final position
            matriculateButton.style.marginTop = "0";  // Remove negative margin
        }
        
        if (shouldShowMenu) {
            menuSection.style.display = "flex";  // Show the menu-section
        } else {
            menuSection.style.display = "none";  // Hide the menu-section
        }

        // Update last known scroll position
        lastKnownScrollPosition = scrollPosition;
    });
});


/* HAMBURGER ICON ANIMATION */
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', ()=>{
    if (!menuOpen){
        menuBtn.classList.add('open');
        menuOpen = true;
    }

    else{
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});

