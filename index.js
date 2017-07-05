const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const TodoModel = require('./models/todoModel');
const dbConnectionString = require('./config/config').dbConnectionString;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(express.static(`${__dirname}/public`)); // serve static file
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

// mongo db, mongoose set up
mongoose.connect(dbConnectionString);
const db = mongoose.connection;
db.on('error', () => { console.log('failed to connect to mongo db'); });
db.once('open', () => { console.log('connect to mongo db'); });
// // test new todoitem save
// new TodoModel({
//   id: 2,
//   title: 'test3',
//   completed: false,
// }).save((err, result) => {
//   if (err) { console.log('add new todo entity to mongo failed ', err); return;}
//   else {
//     console.log('add new todo entity to mongo successed！！ ');
//   }
// });
//
// // test query todos in mongo db        // resultArray 為 陣列
// const cursor = TodoModel.find({}, (err, resultArray) => {
//   if (err) { console.log('query data failed'); return; }
//   console.log(resultArray[0]);
// });

// socket-io set up
const io = socketIo(server);
io.on('connection', (socket) => {
  console.log(`${socket.id} is connecting`);
  TodoModel.find({}, (err, resultArray) => {
    if (err) { console.log('query data failed'); return; }
    io.sockets.emit('initialList', resultArray);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on('addTodo', (todo) => {
    // console.dir(todo);
    const newTodoItem = new TodoModel({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    });
    newTodoItem.save((err, result) => {
      if (err) { console.log('add new todo item failed'); return; }
      io.sockets.emit('todoAdded', todo);
    });
  });
});

server.listen(3000);
