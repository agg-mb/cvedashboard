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
    const dashboard = document.getElementById('dashboard');
    let content = '<h1>Known Exploited CVEs</h1>';

    data.forEach(vulnerabilities => {
        content += `
            <div class="cve-entry">
                <h2>${vulnerabilities.cveID}</h2>
                <p><strong>Published Date:</strong> ${vulnerabilities['dateAdded']}</p>
                <p><strong>Software:</strong> ${vulnerabilities.product}</p>
                <p><strong>Description:</strong> ${vulnerabilities.shortDescription}</p>
            </div>
        `;
    });

    dashboard.innerHTML = content;
}