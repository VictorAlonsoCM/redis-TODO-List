const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000
const redis = require('redis');

var app = express();

const client = redis.createClient({ url: process.env.REDIS_URL });


client.on('connect', () => {
  console.log('Connected to Redis...');
});

app.set('views'), path.join(__dirname, 'views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  var title = 'A Simple Todo List App';
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

app.post('/todo/add', (req, res, next) => {
  var todo = req.body.todos;
  client.RPUSH('todo', todo, (err, reply) => {
    if(err){
      res.send(err);
    }
    res.redirect('/');
  });
});

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

app.listen(3000, () => {
  console.log('Server Started at port 3000...');
});

module.exports = app;
