// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Attach hover events to all <a> elements on the page
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("mouseover", function(event) {
            // Exclude links inside the sidebar
            if (link.closest(".sidebar")) return;

            showPreview(event, link.href);
        });
        link.addEventListener("mouseout", hidePreview);
    });

    // Sidebar toggle functionality (if applicable)
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleSidebar);
    }
});

// Function to show the preview iframe near the cursor
function showPreview(event, url) {
    const previewBox = document.getElementById("preview-box");
    if (!previewBox) return;

    // Insert an iframe with the URL into the preview box
    previewBox.innerHTML = `<iframe src="${url}" frameborder="0"></iframe>`;

    // Position the preview box near the cursor
    previewBox.style.display = "block";
    previewBox.style.left = `${event.pageX}px`;
    previewBox.style.top = `${event.pageY + 20}px`;
}

// Function to hide the preview box
function hidePreview() {
    const previewBox = document.getElementById("preview-box");
    if (previewBox) {
        previewBox.style.display = "none";
        previewBox.innerHTML = ""; // Clear iframe to stop loading
    }
}

// Sidebar toggle function
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("content").classList.toggle("active");
}

// Adjust sidebar based on window resize
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        document.getElementById("sidebar").classList.add("active");
        document.getElementById("content").classList.add("active");
    } else {
        document.getElementById("sidebar").classList.remove("active");
        document.getElementById("content").classList.remove("active");
    }
});
