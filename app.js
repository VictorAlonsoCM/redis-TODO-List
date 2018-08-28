//Declarations
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');

//Initialization of express
var app = express();

//Redis Client
const client = redis.createClient();

client.on('connect', () => {
  console.log('Connected to Redis...');
});

//View engine
app.set('views'), path.join(__dirname, 'views');
app.set('view engine', 'ejs');

//Normalization of the elements used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

//This is our router
app.get('/', (req, res) => {
  var title = 'Redis TODO List';
  var counter = 0;
  client.LRANGE('todo', 0, -1, (err, reply) => {
    if(err){
      res.send(err);
    }
    res.render('index', {
      title: title,
      todo: reply,
      counter: counter
    });
  });
});

//Add messages on redis
app.post('/todo/add', (req, res, next) => {
  var todo = req.body.todos;
  client.RPUSH('todo', todo, (err, reply) => {
    if(err){
      res.send(err);
    }
    res.redirect('/');
  });
});

//Delete messages on redis by index
app.post('/todo/delete', (req, res, next) => {
  var delTODO = req.body.todo;
  var deleted = '__DELETED__';
  client.LRANGE('todo', 0, -1, (err, todo) => {
    for(let i = 0; i < delTODO.length; i++){
      client.LSET('todo', delTODO[i], deleted);
    }
    client.LREM('todo', 0, deleted);
    res.redirect('/');
  });
});

//Port listen of the app
app.listen(3000, () => {
  console.log('Server Started at port 3000...');
});

module.exports = app;