const tree = document.getElementById('tree');
const addPersonButton = document.getElementById('addPerson');

// Save people
const people = [];

addPersonButton.addEventListener('click', () => {
  const name = prompt("Enter person's name:");
  if (!name) return;

  let parentName = null;
  if (people.length > 0) {
    parentName = prompt("Enter parent's name (or leave blank if none):");
  }

  const person = {
    name: name,
    parent: parentName
  };

  people.push(person);
  renderTree();
});

function renderTree() {
  tree.innerHTML = '';

  people.forEach(person => {
    if (person.parent) {
      const parentDiv = [...tree.children].find(div => div.dataset.name === person.parent);
      if (parentDiv) {
        const connector = document.createElement('div');
        connector.className = 'connection';
        parentDiv.appendChild(connector);
      }
    }

    const personDiv = document.createElement('div');
    personDiv.className = 'person';
    personDiv.dataset.name = person.name;
    personDiv.textContent = person.name;
    tree.appendChild(personDiv);
  });
}
