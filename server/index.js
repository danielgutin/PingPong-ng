// Express Server
const express = require('express');
// body Obj of the req parser.
const bodyParser = require('body-parser');
// Server requests convinient Monitoring.
const morgan  = require('morgan');
//the main router, contains all routes.
const route = require('./routes');
//mongoose tool for mongo db Connection.
const mongoose = require('mongoose');
// CORS middlware
const cors = require('cors');

// App Obj.
const app = express();


// ===== MiddleWares ===== // 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// Server requests convinient Monitoring.
app.use(morgan('tiny'))
// CORS Middleware
app.use(cors());
// Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// --- Router Init.
app.use('/', route);


// --- Connection to mongoDB
mongoose.connect('mongodb://localhost/pingpong')
.then(() => {
  console.log('Database connection successful')
  return;
})
.catch(err => {
  console.error('Database connection error')
  console.log(err);
})

// --- Server Initilization.
app.listen(process.env.PORT || 3001, () => console.log(`listening on port ${process.env.PORT || 3001}`));







// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();

// const server = http.createServer(app);

// const io = socketIO(server);

// io.on('connection', socket => {
//     userCount++;
    
//     const username = `Guest ${userCount}`;

//     socket.emit('SET_USERNAME', username);

//     io.sockets.emit('CREATE_MESSAGE', {
//         content : `${username} connected`,
//         user : username
//     });

//     socket.on('SEND_MESSAGE', (messageObj) => {
//         io.sockets.emit('CREATE_MESSAGE', messageObj);
//     });

//     socket.on('disconnected', () => {
//         io.sockets.emit('CREATE_MESSAGE', {
//             content : `${username} disconnected`
//         })
//     })
// });
