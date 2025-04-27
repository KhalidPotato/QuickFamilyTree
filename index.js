const downloadButton = document.getElementById('downloadButton');
const importButton = document.getElementById('importButton');
const fileInput = document.getElementById('fileInput');

// Example family tree structure
let familyTree = {
    name: "John Doe",
    age: 50,
    children: [
        {
            name: "Jane Doe",
            age: 25
        },
        {
            name: "Jake Doe",
            age: 23
        }
    ]
};

// Download functionality
downloadButton.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(familyTree, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "family_tree.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
});

// Import functionality
importButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);
            familyTree = importedData;
            console.log('Imported Family Tree:', familyTree);
            // You can also update UI here if needed
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
    reader.readAsText(file);
});
