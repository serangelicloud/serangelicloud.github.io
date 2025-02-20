    
    // Wait until the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Create preview box element dynamically if not already in HTML
        const previewBox = document.getElementById('preview-box');
        if (!previewBox) {
          const newBox = document.createElement('div');
          newBox.id = 'preview-box';
          newBox.style.cssText = `
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
          document.body.appendChild(newBox);
        }
        
        // Attach hover events to all <a> elements on the page
        const links = document.querySelectorAll("a");
        links.forEach(link => {
          // Ignore anchors and same-page links
          if(link.href.includes('#') || link.href === window.location.href) return;
  
          let hoverTimeout;
          
          link.addEventListener("mouseenter", function(event) {
            // Exclude links inside the sidebar if needed
            if (link.closest(".sidebar")) return;
  
            hoverTimeout = setTimeout(() => {
              // If the link is flagged as a map preview, show map image
              if(link.dataset.map === "true") {
                showMapPreview(event, link);
              } else {
                showPreview(event, link);
              }
            }, 300);
          });
  
          link.addEventListener("mouseleave", function() {
            clearTimeout(hoverTimeout);
            hidePreview();
          });
        });
      });
  
      // Function to show a generic preview (e.g., using an iframe)
      function showPreview(event, link) {
        const previewBox = document.getElementById("preview-box");
        if (!previewBox) return;
        positionPreview(event, previewBox);
        previewBox.style.display = "block";
        try {
          previewBox.innerHTML = `
            <iframe 
                src="${link.href}" 
                frameborder="0"
                style="width: 100%; height: 100%;"
                loading="lazy"
            ></iframe>
          `;
        } catch (error) {
          previewBox.innerHTML = "<p>Preview unavailable</p>";
        }
      }
  
      // Function to show a map preview using TomTom's Static Image API
function showMapPreview(event, link) {
    const previewBox = document.getElementById("preview-box");
    if (!previewBox) return;
    positionPreview(event, previewBox);
    previewBox.style.display = "block";
    
    // Retrieve coordinates and zoom from data attributes
    const lat = link.dataset.lat;
    const lon = link.dataset.lon;
    const zoom = link.dataset.zoom || 13;
    
    // TomTom Static Image API parameters
    const apiKey = 'gplnIWoWFXwhqgWpXZ5J3Z9OzxgSNEjU';
    const width = 300;
    const height = 200;
    const layer = 'basic';
    const style = 'main';
    const format = 'png';
    
    // Build the URL for the TomTom Static Image API
    const mapURL = `https://api.tomtom.com/map/1/staticimage?key=${apiKey}&center=${lat},${lon}&zoom=${zoom}&format=${format}&layer=${layer}&style=${style}&width=${width}&height=${height}`;
    
    // Create a clickable preview that redirects to the original URL
    previewBox.innerHTML = `
      <a href="${link.href}" target="_blank">
        <img src="${mapURL}" alt="Map preview" style="width:100%; height:100%;">
      </a>
    `;
  }
  
  
      // Helper function to position the preview box based on the mouse event
      function positionPreview(event, previewBox) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const offset = 20;
        
        let left = event.clientX + offset;
        let top = event.clientY + offset;
        
        // Adjust position if preview goes beyond viewport boundaries
        if (left + 300 > viewportWidth) {
          left = viewportWidth - 300 - offset;
        }
        if (top + 200 > viewportHeight) {
          top = viewportHeight - 200 - offset;
        }
        
        previewBox.style.left = `${left}px`;
        previewBox.style.top = `${top}px`;
      }
  
      // Function to hide the preview
      function hidePreview() {
        const previewBox = document.getElementById("preview-box");
        if (previewBox) {
          previewBox.style.display = "none";
          previewBox.innerHTML = ""; // Clear content to stop any loading
        }
      }