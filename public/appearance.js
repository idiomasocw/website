

    const menuSection = document.querySelector("#menu-section");
    const matriculateButton = document.querySelector(".matriculate-button a");

    // Initialize to the intended starting position
    if (matriculateButton) {
        // Initialize to the intended starting position
        matriculateButton.style.top = "-10px";
        matriculateButton.style.marginTop = "-10px";
        
        window.addEventListener("scroll", function() {
            let scrollPosition = window.scrollY;
        
        // Add sticky class and adjust top position
        if (scrollPosition > 50 && scrollPosition < 1500) {
            shouldShowMenu = true;
            menuSection.classList.add("menu-section-sticky");
        } 
        // Condition to hide the menu after 800px
        else if (scrollPosition >= 1500) {
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
        if (scrollPosition === 0 || (scrollPosition > 0 && scrollPosition < 50)) {
            matriculateButton.style.top = (scrollPosition === 0) ? "-10px" : "0";
            matriculateButton.style.marginTop = (scrollPosition === 0) ? "-10px" : "0";
        }
    });
}

let lastKnownScrollPosition = 0;
let shouldShowMenu = true;

window.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;
    
    // Add or remove sticky class based on scroll position
    if (scrollPosition > 50 && scrollPosition < 1500) {
        shouldShowMenu = true;
        menuSection.classList.add("menu-section-sticky");
    } else if (scrollPosition >= 1500) {
        shouldShowMenu = false;
        menuSection.classList.remove("menu-section-sticky");
    }

    // Toggle display of the menu section based on scroll position
    if (shouldShowMenu) {
        menuSection.style.display = "flex";
    } else {
        menuSection.style.display = "none";
    }

    // Update last known scroll position
    lastKnownScrollPosition = scrollPosition;
});


/* Reposition 'matriculate ya' button index when seen from a cellphone */
document.addEventListener('scroll', function() {
    // Get the button element
    var button = document.querySelector('.matriculate-button-mobile');

    // Calculate the distance from the top of the document to the button
    var buttonTop = button.getBoundingClientRect().top;

    // Convert 5rem to pixels (assuming the user has a default font-size of 16px)
    var remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5;

    // Check if the button is within 5rem of the top of the viewport
    if (buttonTop <= remInPixels) {
        button.style.zIndex = 1;
    } else {
        button.style.zIndex = 2;
    }
});