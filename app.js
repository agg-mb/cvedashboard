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

    // Sorting the vulnerabilitiesArray by dateAdded from newest to oldest
    vulnerabilitiesArray.sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB - dateA; // For descending order
    });

    const dashboard = document.getElementById('dashboard');
    let content = '<h1>Known Exploited CVEs</h1>';

    vulnerabilitiesArray.forEach(vulnerability => {
        content += `
            <div class="cve-entry">
                <p>${vulnerability.cveID}</p>
                <p><strong>Published Date:</strong> ${vulnerability['dateAdded']}</p>
                <p><strong>Software:</strong> ${vulnerability.product}</p>
                <p><strong>Description:</strong> ${vulnerability.shortDescription}</p>
            </div>
        `;
    });

    dashboard.innerHTML = content;
}
