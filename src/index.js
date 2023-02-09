const express = require("express");
const path = require("path");
require("dotenv").config();

//db config
const {connectDB} = require('./database/config');
connectDB();

//app de express
const app = express();


//lectura y parseo del body
app.use(express.json());


//node server
const server = require('http').createServer(app);

//socket.io server
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));


//mis rutas
app.use("/api/user", require("./routes/auth"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/messages", require("./routes/message.route"));


server.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 3000");
});
