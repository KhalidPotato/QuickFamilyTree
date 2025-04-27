const downloadButton = document.getElementById('download-button');
const importButton = document.getElementById('import-button');
const fileInput = document.getElementById('file-input');

// Example family tree data
let familyTreeData = {
    name: "Root Person",
    children: []
};

// Download JSON
downloadButton.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(familyTreeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "family_tree.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
});

// Import JSON
importButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            familyTreeData = JSON.parse(e.target.result);
            alert("Family tree loaded successfully!");
        } catch (err) {
            alert("Invalid JSON file!");
        }
    };
    reader.readAsText(file);
});
