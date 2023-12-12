
// Function to scroll to the top of the page with smooth animation
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    window.scrollTo({ top: 0, behavior: 'smooth' }); // For all browsers
}

// Event listener to set the theme based on local storage and toggle dark mode
document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle button and icon
    var themeButton = document.getElementById("themeToggle");
    var themeIcon = document.getElementById("themeIcon");

    // Check local storage for the theme and apply it
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.src = "dark-mode-icon-url";
    } else {
        themeIcon.src = "light-mode-icon-url";
    }

    // Toggle dark mode on button click
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);

        // Change theme icon based on the selected theme
        themeIcon.src = theme === "dark" ? "dark-mode-icon-url" : "light-mode-icon-url";
    });
});

// Event listener to enable smooth scrolling for all links pointing to page sections
document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll("a[href^='#']");

    // Add smooth scrolling to all links
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default action
            var target = document.querySelector(this.getAttribute("href")); // Get the target element
            target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to target
        });
    }
});

// Event listener to toggle the visibility of the "back to top" button based on scroll position
window.onscroll = function () {
    scrollFunction()
};

// Function to toggle the "back to top" button visibility
function scrollFunction() {
    var backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Function to encode text and replace the content of an element
function encodeText() {
    const originalText = document.getElementById("textforencoder").innerHTML;
    const encodedText = "encoded-text";
    document.getElementById("textforencoder").innerHTML = encodedText;
}

// Function to decode text and replace the content of an element
function decodeText() {
    const encodedText = document.getElementById("textforencoder").innerHTML;
    const decodedText = "decoded-text";
    document.getElementById("textforencoder").innerHTML = decodedText;
}

// Functions to show and hide a custom context menu, and handle text selection (I AM NOT DELETING THIS BECAUSE SOMEHOW THE PAGE DOES NOT LOAD ANYMORE)
function showMenu(x, y) {
    const menu = document.getElementById('custom-menu');
 menu.style.display = 'block';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
}
function hideMenu() {
    const menu = document.getElementById('custom-menu');
    menu.style.display = 'none';
}
function handleSelection(event) {                            
    const selectedText = window.getSelection().toString().trim();
    const menu = document.getElementById('custom-menu');

    if (selectedText !== '') {
        // Customize the menu options based on the selected text
        document.getElementById('copy').addEventListener('click', function () {
            document.execCommand('copy');
            hideMenu();
        });
        // Show the menu at the selection coordinates
        showMenu(event.pageX, event.pageY);
        event.preventDefault(); // Prevent the default context menu from appearing
    } else {
        hideMenu();
    }
}

// Attach the selection event listener to the document
document.addEventListener('mouseup', handleSelection);

// Event listener to check and add a fade-in effect to elements on scroll
document.addEventListener("DOMContentLoaded", function () {
    var elements = document.querySelectorAll(".fade-effect");

    // Function to check visibility and add/remove the 'active' class
    function checkVisibility() {
        elements.forEach(function (element) {
            var rect = element.getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;

            // Check if the element is at least 25% visible and at most 75% visible in the viewport
            if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    // Initial check on page load
    checkVisibility();

    // Check when the user scrolls
    window.addEventListener("scroll", function () {
        checkVisibility();
    });
});
