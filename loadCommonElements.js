// Function to load common elements
function loadCommonElement(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // Execute the callback function if provided
            if (callback) {
                callback();
            }
        });
}

// Load common elements with callbacks
loadCommonElement('dark-header', 'dark-header.html');
loadCommonElement('menu-section', 'menu-section.html', function() {
    initializeMenu(); // This function will be in app.js
    initializeAppearance(); // This function will be in appearance.js
});
loadCommonElement('footer', 'footer.html');
loadCommonElement('menu-section2', 'menu-section2.html', function() {
    initializeMenu(); // This function will be in app.js
    initializeAppearance(); // This function will be in appearance.js
});
