const DATA_FILE = "./data.json";  // Relative path to data.json file

fetch(DATA_FILE)
    .then(response => response.json())
    .then(data => {
        displayData(data);
    })
    .catch(error => {
        console.error('Error fetching the CVE data:', error);
    });

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
    let content = '<h1>Known Exploited CVEs from Last 14 Days</h1>';

    recentVulnerabilities.forEach(vulnerability => {
        content += `
            <div class="cve-entry">
                <h2>${vulnerability.cveID}</h2>
                <p><strong>Vendor:</strong> ${vulnerability.vendorProject}</p>
                <p><strong>Published Date:</strong> ${vulnerability['dateAdded']}</p>
                <p><strong>Description:</strong> ${vulnerability.shortDescription}</p>
            </div>
        `;
    });

    dashboard.innerHTML = content;
}
