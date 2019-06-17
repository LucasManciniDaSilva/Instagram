//exporting dependecies 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//Dependecies to using routes, parameters and results
const app = express();

//Divide the server to suport the protocol HTTP and the websockets
const server = require('http').Server(app);
//Real time result
const io = require('socket.io')(server);

//connection with the mongoDB
mongoose.connect('mongodb+srv://Ignis:ignis@cluster0-lynax.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

//Review the information receiving by the io, and send to the Front-End
app.use((req, res, next) =>{
    req.io = io;

    next();
})

//All the url on the server can be acess this back-end
app.use(cors());

//Acess the static files in the folder.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

//Declared the routes of the Application
app.use(require('./routes'));

server.listen(3333);



