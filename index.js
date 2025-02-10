// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Create preview box element dynamically
    const previewBox = document.createElement('div');
    previewBox.id = 'preview-box';
    previewBox.style.cssText = `
        display: none;
        position: absolute;
        width: 300px;
        height: 200px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        overflow: hidden;
    `;
    document.body.appendChild(previewBox);

    // Attach hover events to all <a> elements on the page
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        // Ignore anchors and same-page links
        if(link.href.includes('#') || link.href === window.location.href) return;

        let hoverTimeout;
        
        link.addEventListener("mouseenter", function(event) {
            // Exclude links inside the sidebar
            if (link.closest(".sidebar")) return;

            // Add slight delay before showing preview
            hoverTimeout = setTimeout(() => {
                showPreview(event, link.href);
            }, 300);
        });

        link.addEventListener("mouseleave", function() {
            clearTimeout(hoverTimeout);
            hidePreview();
        });
    });

    // Sidebar toggle functionality
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleSidebar);
    }

    // Close sidebar when clicking outside (mobile only)
    document.addEventListener('click', function(event) {
        if (window.innerWidth > 768) return;
        
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');
        
        if (!event.target.closest('.sidebar') && !event.target.closest('.hamburger')) {
            sidebar.classList.remove("active");
            content.classList.remove("active");
        }
    });
});

// Improved preview positioning
function showPreview(event, url) {
    const previewBox = document.getElementById("preview-box");
    if (!previewBox) return;

    // Position calculation with viewport boundaries
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const offset = 20;
    
    let left = event.clientX + offset;
    let top = event.clientY + offset;

    // Adjust position if it goes beyond viewport
    if (left + 300 > viewportWidth) {
        left = viewportWidth - 300 - offset;
    }
    if (top + 200 > viewportHeight) {
        top = viewportHeight - 200 - offset;
    }

    previewBox.style.left = `${left}px`;
    previewBox.style.top = `${top}px`;
    previewBox.style.display = "block";

    // Load content safely
    try {
        previewBox.innerHTML = `
            <iframe 
                src="${url}" 
                frameborder="0"
                style="width: 100%; height: 100%;"
                loading="lazy"
            ></iframe>
        `;
    } catch (error) {
        previewBox.innerHTML = "<p>Preview unavailable</p>";
    }
}

function hidePreview() {
    const previewBox = document.getElementById("preview-box");
    if (previewBox) {
        previewBox.style.display = "none";
        previewBox.innerHTML = ""; // Clear iframe to stop loading
    }
}

// Sidebar toggle with state management
let isSidebarActive = false;
function toggleSidebar() {
    isSidebarActive = !isSidebarActive;
    document.getElementById("sidebar").classList.toggle("active", isSidebarActive);
    document.getElementById("content").classList.toggle("active", isSidebarActive);
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
            document.getElementById("sidebar").classList.add("active");
            document.getElementById("content").classList.add("active");
            isSidebarActive = true;
        } else {
            document.getElementById("sidebar").classList.remove("active");
            document.getElementById("content").classList.remove("active");
            isSidebarActive = false;
        }
    }, 100);
});