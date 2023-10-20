// loadCommonElements.js

document.addEventListener("DOMContentLoaded", function() {
    fetch('dark-header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('dark-header-placeholder').innerHTML = data;
        document.dispatchEvent(new Event('headerLoaded'));
    });

    fetch('menu-section.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-section-placeholder').innerHTML = data;
        document.dispatchEvent(new Event('menuLoaded'));
    });

    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
        document.dispatchEvent(new Event('footerLoaded'));
    });
});
