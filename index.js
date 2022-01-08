const http = require('http');
const server = http.createServer(handleRequest);
server.listen(3000, () => console.log('server started at http://localhost:3000'));

const fs = require('fs');

const users = [
  {id: 0, name: "Petro"},
  {id: 1, name: "Stepan"},
  {id: 2, name: "Ivan"},
];

let nextId = 3;

function handleRequest(request, response) {
  if (request.url.startsWith('/api/')) {
    const route = request.url.slice(5);

    switch (route) {
      case 'users':
        response.end(JSON.stringify(users));
        break;
      
      case 'addUser':
        users.push({id: nextId++, name: request.headers.user});
        response.end('done');
        break;

      default:
        response.end('endpoint does not exist');
        break;
    }
  } else {
    try {
      let path = request.url;
      if (path === '/') path += 'index.html';

      const fileContent = fs.readFileSync('.' + path);
      response.end(fileContent);
    } catch (error) {
      response.end('file not found');
    }
  }
}

//! http://localhost:3000/api/users

