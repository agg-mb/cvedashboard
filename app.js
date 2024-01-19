/* Path to data */
const DATA_FILE = "./data.json";  // Relative path to data.json file

/* Automatic scrolling */
const dashboard = document.getElementById('dashboard');
let scrollDirection = 1; // 1 for downward, -1 for upward
const scrollSpeed = 1; // Adjust for faster or slower scroll

/* Fetch data */
fetch(DATA_FILE)
    .then(response => response.json())
    .then(data => {
        displayData(data);
    })
    .catch(error => {
        console.error('Error fetching the CVE data:', error);
    });

/* Display the data */
function displayData(data) {
    const vulnerabilitiesArray = data.vulnerabilities || [];

    // Filtering the vulnerabilities from the last 14 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 14);
    
    const recentVulnerabilities = vulnerabilitiesArray.filter(vulnerability => {
        const vulnerabilityDate = new Date(vulnerability.dateAdded);
        return vulnerabilityDate >= oneWeekAgo;
    });

    // Sorting the recent vulnerabilities by dateAdded from newest to oldest
    recentVulnerabilities.sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB - dateA; // For descending order
    });

    const dashboard = document.getElementById('dashboard');

    function sanitizeHTML(str) {
        var temp = document.createElement('div');
        temp.innerHTML = str;
    
        // Allowable tags and attributes
        var safe_tags = ['a', 'b', 'i', 'em', 'strong', 'p', 'ul', 'li', 'h1', 'h2', 'h3', 'br', 'span', 'div'];
        var safe_attrs = ['href', 'title', 'style', 'target', 'rel', 'class', 'id'];
    
        // Remove script tags and event handlers
        var elements = temp.getElementsByTagName('*');
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            for (var j = element.attributes.length - 1; j >= 0; j--) {
                var attribute = element.attributes[j];
                if (safe_attrs.indexOf(attribute.name.toLowerCase()) === -1 || attribute.name.startsWith('on')) {
                    element.removeAttribute(attribute.name);
                }
            }
            if (safe_tags.indexOf(element.tagName.toLowerCase()) === -1) {
                element.parentNode.replaceChild(document.createTextNode(element.outerHTML), element);
            }
        }
        return temp.innerHTML; // return sanitized HTML
    }
    
    let content = '';

    // Generating the content
    recentVulnerabilities.forEach(vulnerability => {
        let notesLinks = '';
        
        // Check if the notes field exists and has content
        if (vulnerability.notes) {
            // Use regex to extract all URLs
            const urls = vulnerability.notes.match(/https?:\/\/[^\s,]+/g);
            
            if (urls) {
                urls.forEach(url => {
                    notesLinks += `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a><br>`;
                });
            }
        }
    
        content += `
            <div class="cve-entry">
                <h2>${vulnerability.cveID}</h2>
                <p><strong>Vendor:</strong> ${vulnerability.vendorProject}</p>
                <p><strong>Published Date:</strong> ${vulnerability['dateAdded']}</p>
                <p><strong>Description:</strong> ${vulnerability.shortDescription}</p>
                <p><strong>Notes:</strong><br>${notesLinks}</p>
            </div>
        `;
    });
    dashboard.innerHTML = sanitizeHTML(content);
}

/* Automatically scrolling */
function autoScroll() {
    if (dashboard.scrollHeight <= dashboard.clientHeight) {
        // If all content is visible, no need to scroll
        return;
    }

    // Check if we've scrolled to the bottom
    if (dashboard.scrollTop + dashboard.clientHeight >= dashboard.scrollHeight) {
        scrollDirection = -1;
    }
    // Check if we've scrolled back to the top
    else if (dashboard.scrollTop === 0) {
        scrollDirection = 1;
    }

    dashboard.scrollTop += scrollSpeed * scrollDirection;
}

setInterval(autoScroll, 100); // Adjust interval for faster or slower scroll
