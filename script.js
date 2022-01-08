'use strict'


const url = "http://localhost:3000/api/users"
fetch(url)
  .then(response => response.json())
  .then(users => document.body.append(buildTable(users)))
  
document.body.innerHTML += Math.random();

function buildTable(users) {
  const table = document.createElement('table');
  for (const user of users) {
    const tr = document.createElement('tr');
    for (const key in user) {
      const td = document.createElement('td');
      td.textContent = user[key];
      tr.append(td);
    }
    table.append(tr);
  }
  return table;
}

// const input = document.querySelector('[type="text"]');
// const btn = document.querySelector('[type="button"]');
const [input, btn] = document.querySelectorAll('input');
btn.addEventListener('click', () => {
  const userName = input.value;
  input.value = '';
  fetch('/api/addUser', {method:'GET', headers:{user: userName}});
})
