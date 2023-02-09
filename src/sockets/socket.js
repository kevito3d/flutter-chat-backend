const { userConnected, userDisconnected, saveMessage } = require("../controller/socket.controller");
const { checkJWT } = require("../helpers/jwt");
const { io } = require("../index");
io.on("connection", (client) => {
  console.log("Client connected...");

  //?? cliente con jwt
  // console.log(client.handshake.headers['x-token']);
  const [valid, uid] = checkJWT(client.handshake.headers["x-token"]);

  //verifica auth
  if (!valid) {
    return client.disconnect();
  }
  //CLIENTE CONECTADO
  userConnected(uid);

  //join user to a specific room
  //room global, room per user
  client.join(uid); //room per user

  //liste personal messages
  client.on("private-message", (payload) => {
    // save message
    saveMessage(payload);

    //find payload.to in the room and send the message
    
     
    io.to(payload.to).emit("private-message", payload);  //find in the room the user with the id and send the message
  });

  //listen user is writing
  client.on("user-writting", ({ from, to, writting }) => {
    client.broadcast.to(to).emit("user-writting", { from, to, writting });
  });


  

  client.on("disconnect", () => {
    console.log("Client disconnected");
    userDisconnected(uid);
  });

  // client.on("message", (payload) => {
  //   console.log(payload);
  //   io.emit("message", { admin: "Nuevo mensaje" });
  // });
});
