var socket = require('socket.io-client')('http://localhost:1337');



function initSocketListener(symbols, cb){
    var socket = require('socket.io-client')('http://localhost:1337');
    socket.on('connect', function(){
        console.log("Connected to server")
        symbols.forEach( (symbol)=> {
            socket.emit('subscribe', symbol)
        } )
        console.log("subscribed to " + symbols)
    });

    socket.on("message", function(data){
        if(cb)
        {
            cb( data )
        }
    })
}


function subscribe(symbol){
    socket.emit('subscribe', 'AAPL');
}

module.exports = {
    initSocketListener,
    subscribe
}
