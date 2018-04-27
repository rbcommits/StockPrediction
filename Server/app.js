//import { getHighest, getLowest, getAverage } from 'server_api.js'

const port = process.env.port || 1337

const express = require("express"), expressLogging = require('express-logging'), logger = require('logops');
const date = require("datejs");
const MongoClient = require('mongodb').MongoClient;
const yahooFinance = require("yahoo-finance")
const assert = require("assert")
const app = express();

const symbols = ["AAPL", "MSFT", "AABA", "ACN", "ADP", "FB", "AMZN", "GOOGL", "IBM", "LMT"]

const dbName = "stock_data"
const dbConnection = "mongodb://raghav:pN98TwHxbGz6@ds046357.mlab.com:46357/stock_data"
const cors = require('cors')

//Start the schedular to fetch data every minute
var subscriptions = {}
symbols.forEach((symbol)=>{
    subscriptions[symbol] = [] //init assosiative array of subscribers
})


app.use(expressLogging(logger));
app.use(cors())
app.get("/", (req, res) => {
    res.send("HomePage for stock prediction app")
})

app.get("/stock/today", (req, res) => {
    res.send("request received to get today's stock: ");
})


app.get("/stock/highest/:days/:symbol", (req, res) => {
    res.send("function under construction")
});



app.get("/stock/lowest/:days/:symbol", (req, res) => {
    res.send("function under construction")
});


app.get("/stock/average/:days/:symbol", (req, res) => {
    res.send("function under construction")
});



//get data for a symbol between 2 time frames
app.get("/stock/symbol/:symbol/date/:from-:to", (req, res) => {
    

})

app.get("/stock/insertBulk/:symbol/:duration", (req, res) => {

    
})
app.get("*", (req, res) => {
    res.redirect("/")
})

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connect', function(client){ 
    console.log('client connected') 
    client.on('subscribe', function(symbol){
        console.log("Client asked to subscribe to " + symbol);
        subscriptions[symbol].push(client)
    })
    client.send("heelo from server")
});
/*
io.on('subscribe', function(client, symbol){
    console.log("Client asked to subscribe to " + symbol);
    
})
*/
io.on('message', function(data){
    console.log("Got message from client")
    console.log(data)
})
server.listen(port, () => console.log("Listening on port: " + port));

//app.listen(port, () => console.log("Listening on port: " + port))
