const tree = document.getElementById('tree');
const addPersonButton = document.getElementById('addPerson');

addPersonButton.addEventListener('click', () => {
  const name = prompt("Enter person's name:");
  if (name) {
    const person = document.createElement('div');
    person.className = 'person';
    person.textContent = name;
    tree.appendChild(person);
  }
});
