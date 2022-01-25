const express = require("express");
var http = require("http")
// const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

// middleware
app.use(express.json());
var users=[];
// app.use(cors());

io.on("connection", (socket)=>{
    console.log("connected");
    console.log(socket.id, "has connected");
    socket.on("logon", (id)=>{
        console.log(id);
        users[id]=socket;
        console.log(users);
    });
    socket.on("msg", (msg)=>{
        console.log(msg);
        let receiverId = msg.receiverId;
        if(users[receiverId])
        users[receiverId].emit("msg",msg);

    });
});

app.route("/check").get((req, res)=>{
    return res.json("Your working effectively");

});

server.listen(port, "0.0.0.0",()=>{
    console.log("server started");
});