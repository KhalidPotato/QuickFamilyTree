const tree = document.getElementById('tree');
const addPersonButton = document.getElementById('addPerson');
const saveTreeButton = document.getElementById('saveTree');
const loadTreeButton = document.getElementById('loadTree');
const clearTreeButton = document.getElementById('clearTree');

let people = [];

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

saveTreeButton.addEventListener('click', () => {
  localStorage.setItem('familyTree', JSON.stringify(people));
  alert('Tree saved!');
});

loadTreeButton.addEventListener('click', () => {
  const saved = localStorage.getItem('familyTree');
  if (saved) {
    people = JSON.parse(saved);
    renderTree();
  } else {
    alert('No saved tree found.');
  }
});

clearTreeButton.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear the tree?")) {
    people = [];
    renderTree();
  }
});

function renderTree() {
  tree.innerHTML = '';

  const rootPeople = people.filter(p => !p.parent);
  rootPeople.forEach(person => {
    const rootNode = createPersonNode(person);
    tree.appendChild(rootNode);
    renderChildren(person.name, rootNode);
  });
}

function renderChildren(parentName, parentNode) {
  const children = people.filter(p => p.parent === parentName);
  if (children.length === 0) return;

  const childrenContainer = document.createElement('div');
  childrenContainer.style.display = 'flex';
  childrenContainer.style.justifyContent = 'center';
  childrenContainer.style.marginTop = '20px';

  children.forEach(child => {
    const childNode = createPersonNode(child);
    const connector = document.createElement('div');
    connector.className = 'connection-line';
    parentNode.appendChild(connector);
    childrenContainer.appendChild(childNode);
    renderChildren(child.name, childNode);
  });

  parentNode.appendChild(childrenContainer);
}

function createPersonNode(person) {
  const div = document.createElement('div');
  div.className = 'person';
  div.textContent = person.name;
  div.dataset.name = person.name;

  div.addEventListener('click', (e) => {
    e.stopPropagation();
    const action = prompt(`Edit or Delete ${person.name}? Type 'edit' or 'delete'.`);
    if (action === 'edit') {
      const newName = prompt('Enter new name:', person.name);
      if (newName) {
        updatePersonName(person.name, newName);
        renderTree();
      }
    } else if (action === 'delete') {
      if (confirm(`Are you sure you want to delete ${person.name} and their descendants?`)) {
        deletePersonAndDescendants(person.name);
        renderTree();
      }
    }
  });

  return div;
}

function updatePersonName(oldName, newName) {
  people.forEach(p => {
    if (p.name === oldName) {
      p.name = newName;
    }
    if (p.parent === oldName) {
      p.parent = newName;
    }
  });
}

function deletePersonAndDescendants(name) {
  const toDelete = [name];
  let more = true;

  while (more) {
    more = false;
    people.forEach(p => {
      if (toDelete.includes(p.parent)) {
        toDelete.push(p.name);
        more = true;
      }
    });
  }

  people = people.filter(p => !toDelete.includes(p.name));
}
