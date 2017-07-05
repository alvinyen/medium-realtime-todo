const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(express.static(`${__dirname}/public`)); // serve static file
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extend: true }));

// socket-io set up
const io = socketIo(server);
io.on('connection', (socket) => {
  console.log(`${socket.id} is connecting`);
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(3000);
