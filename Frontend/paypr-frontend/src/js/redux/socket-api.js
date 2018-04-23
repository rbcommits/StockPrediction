import socketIOClient from 'socket.io-client'


const socket = socketIOClient("localhost:3030")

export default function initSocketListener(){
    socket.on("LiveStockPrice", (data)=> {
        
    })
}