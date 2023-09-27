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
    const vulnerabilitiesArray = data.vulnerabilities; // Target the array inside the object

    const dashboard = document.getElementById('dashboard');
    let content = '<h1>Known Exploited CVEs</h1>';

    vulnerabilitiesArray.forEach(vulnerability => {
        content += `
            <div class="cve-entry">
                <h2>${vulnerability.cveID}</h2>
                <p><strong>Published Date:</strong> ${vulnerability['dateAdded']}</p>
                <p><strong>Software:</strong> ${vulnerability.product}</p>
                <p><strong>Description:</strong> ${vulnerability.shortDescription}</p>
            </div>
        `;
    });

    dashboard.innerHTML = content;
}
