var socket = require('socket.io-client')('http://localhost:1337');



function initSocketListener(){
    socket.on('connect', function(){
        console.log("Connected to server")
        socket.emit('subscribe', 'AAPL')
        console.log('subscribed to aapl')
    });
}


function subscribe(symbol){
    socket.emit('subscribe', 'AAPL');
}

initSocketListener()

socket.on("message", function(data){
    console.log("got message")
    console.log(data)
})
