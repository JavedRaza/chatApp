const socket = io('http://localhost:8000' , { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('send_container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

const append = (message , position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

form.addEventListener('submit' , (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}` , 'right')
    socket.emit('send' , message);
    messageInput.value = '';
})

var _name = prompt('Enter your name to join')
// console.log(_name)
socket.emit('new-user-joined',_name)

socket.on('user-joined' , _name =>{
    append(`${_name} joined the chat` , "right");
})

socket.on('recieve' , data =>{
    append(`${data.name} : ${data.message}` , "left");
})

socket.on('leave' , name =>{
    append(`${name} : left the chat`  , 'left');
})