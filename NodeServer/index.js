//node server
const io = require('socket.io')(8000)

const users = {};

io.on('connection' , (socket) =>{
    socket.on('new-user-joined' , _name=>{
        console.log("new user" , _name)
        users[socket.id] = _name;
        socket.broadcast.emit('user-joined' ,_name);
    });
    socket.on('send' , message=>{
        socket.broadcast.emit('recieve' , {message: message , name:users[socket.id]});
    });
    socket.on('disconnect' , message=>{
        socket.broadcast.emit('leave' , users[socket.id]);
        delete users[socket.id];
    });
});

