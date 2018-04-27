const port = process.env.port || 1340

    const express = require("express"),
        expressLogging = require('express-logging'),
        logger = require('logops');
    const date = require("datejs");
    const MongoClient = require('mongodb').MongoClient;
    const yahooFinance = require("yahoo-finance")
    const assert = require("assert")
    const app = express();

    const symbols = [
        "AAPL",
        "MSFT",
        "AABA",
        "ACN",
        "ADP",
        "FB",
        "AMZN",
        "GOOGL",
        "IBM",
        "LMT"
    ]

    const dbName = "stock_data"
    const dbConnection = "mongodb://raghav:pN98TwHxbGz6@ds046357.mlab.com:46357/stock_data"
    const cors = require('cors')

    // Predictions
    var CURRENT_PREDICTION
    var LONGTERM_PREDICTION

    //Start the schedular to fetch data every minute
    var subscriptions = {}
    symbols.forEach((symbol) => {
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
        var results = {}
        var days = req.params.days
        var sym = req.params.symbol
        var day = parseInt(days);
        var today = new Date();
        today.setDate(today.getDate() - day);
        var localeDay = today.toLocaleDateString()
        console.log("\ndate is " + localeDay + "\n")

        MongoClient.connect(dbConnection, function (err, client) {
            //assert.equal(null, err); console.log("Connected correctly to server");

            const db = client.db(dbName);

            db
                .collection(sym + "historical")
                .find({
                    date: {
                        $gte: localeDay
                    }
                })
                .sort({high: -1})
                .limit(1)
                .toArray(function (err, result) {
                    if (err) {
                        console.log("ERROR");
                    }
                    console.log(JSON.stringify(result));
                    client.close();
                });

        });

        //results
        res.send("Asked for results");

    });

    app.get("/stock/lowest/:days/:symbol", (req, res) => {
        var results = {}
        var days = req.params.days
        var sym = req.params.symbol
        var day = parseInt(days);
        var today = new Date();
        today.setDate(today.getDate() - day);
        var localeDay = today.toLocaleDateString()
        console.log("\ndate is " + localeDay + "\n")

        MongoClient.connect(dbConnection, function (err, client) {
            //assert.equal(null, err); console.log("Connected correctly to server");

            const db = client.db(dbName);

            db
                .collection(sym + "historical")
                .find({
                    date: {
                        $gte: localeDay
                    }
                })
                .sort({
                    low :+ 1
                })
                .limit(1)
                .toArray(function (err, result) {
                    if (err) {
                        console.log("ERROR");
                    }
                    console.log(JSON.stringify(result));
                    client.close();
                });

        });

        //results
        res.send("Asked for results");

    });

    //.aggregate([{$group: {_id:null, pop: {$avg:"$murders"} } }])

    app.get("/stock/average/:days/:symbol", (req, res) => {
        var results = {}
        var days = req.params.days
        var sym = req.params.symbol
        var day = parseInt(days);
        var today = new Date();
        today.setDate(today.getDate() - day);
        var localeDay = today.toLocaleDateString()
        console.log("\ndate is " + localeDay + "\n")

        MongoClient.connect(dbConnection, function (err, client) {
            //assert.equal(null, err); console.log("Connected correctly to server");

            const db = client.db(dbName);

            db
                .collection(sym + "historical")
                .aggregate([
                    {
                        $match: {
                            date: {
                                $gte: localeDay
                            }
                        }
                    }, {
                        $group: {
                            _id: null,
                            averagePrice: {
                                $avg: "$close"
                            }
                        }
                    }
                ])
                .toArray(function (err, result) {
                    if (err) {
                        console.log("ERROR");
                    }
                    console.log(JSON.stringify(result));
                    client.close();
                });

        });

        //results
        res.send("Asked for results");

    });

    app.get("/stock/currentpred/:symbol", (req, res) => {
        var result
        MongoClient.connect(dbConnection, function (err, client) {
            const db = client.db(dbName);
            result = CURRENT_PREDICTION
            if (err) {
                console.log("ERROR");
            }
            console.log(JSON.stringify(result));
            client.close();
        });
    });

    app.get("/stock/longtermpred/:symbol", (req, res) => {
        var result
        MongoClient.connect(dbConnection, function (err, client) {
            const db = client.db(dbName);
            result = LONGTERM_PREDICTION
            if (err) {
                console.log("ERROR");
            }
            console.log(JSON.stringify(result));
            client.close();
        });
    });

    //get data for a symbol between 2 time frames
    app.get("/stock/symbol/:symbol/date/:from-:to", (req, res) => {})

    app.get("/stock/insertBulk/:symbol/:duration", (req, res) => {})
    app.get("*", (req, res) => {
        res.redirect("/")
    })

    var server = require('http').createServer(app);
    var io = require('socket.io')(server);

    io.on('connect', function (client) {
        console.log('client connected')
        client.on('subscribe', function (symbol) {
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
    io.on('message', function (data) {
        console.log("Got message from client")
        console.log(data)
    })
    server.listen(port, () => console.log("Listening on port: " + port));

    //app.listen(port, () => console.log("Listening on port: " + port))