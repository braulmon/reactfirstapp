const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const users = { 
  users_list :
  [
    { 
        id : 'xyz789',
        name : 'Charlie',
        job: 'Janitor',
    },
    {
        id : 'abc123', 
        name: 'Mac',
        job: 'Bouncer',
    },
    {
        id : 'ppp222', 
        name: 'Mac',
        job: 'Professor',
    }, 
    {
        id: 'yat999', 
        name: 'Dee',
        job: 'Aspring actress',
    },
    {
        id: 'zap555', 
        name: 'Dennis',
        job: 'Bartender',
    }
  ]
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
  const name = req.query.name;
  if (name != undefined){
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
  }
  else{
      res.send(users);
  }
});

const findUserByName = (name) => { 
  return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users:job', (req, res) => {
  const job = req.params.job;

  if (name != undefined & job != undefined){
      let result = findUserByJob(job);
      result = {users_list: result};
      res.send(result);
  }
  else{
      res.send(users);
  }
})

const findUserByJob = (job) => { 
  return users['users_list'].filter( (user) => user['job'] === job); 
}

app.get('/users/:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      result = {users_list: result};
      res.send(result);
  }
});

function findUserById(id) {
  return users['users_list'].find( (user) => user['id'] === id); // or line below
  //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateID();
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

function addUser(user){
  users['users_list'].push(user);
}

function generateID(user){
  return Math.random().toString(36).substr(2, 6);
}

app.delete('/users:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      result = {users_list: result};
      res.status(204).send();
  }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});