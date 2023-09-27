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

    data.forEach(cve => {
        content += `
            <div class="cve-entry">
                <h2>${cve.CVE}</h2>
                <p><strong>Published Date:</strong> ${cve['Published Date']}</p>
                <p><strong>Software:</strong> ${cve.Software}</p>
                <p><strong>Reference:</strong> <a href="${cve.Reference}" target="_blank">${cve.Reference}</a></p>
            </div>
        `;
    });

    dashboard.innerHTML = content;
}
