const toggleButton = document.getElementsByClassName('menu-toggle')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const menuContainer = document.getElementsByClassName('menu')[0]

toggleButton.addEventListener('click',()=>{
    navbarLinks.classList.toggle('active')
    menuContainer.classList.toggle('active')
})



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
