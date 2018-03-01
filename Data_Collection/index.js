const port = 3000

const express = require("express"), expressLogging = require('express-logging'), logger = require('logops');
const date = require("datejs");
const MongoClient = require('mongodb').MongoClient;
const yahooFinance = require("yahoo-finance")
const assert = require("assert")
const app = express();



app.use(expressLogging(logger));

app.get("/", (req, res) => {
    res.send("HomePage for stock prediction app")
})
app.get("/stock/today", (req, res) => {
    res.send("request received to get today's stock: ");
})

app.get("/stock/symbol/:symbol/date/:from-:to", (req, res) => {
    from_date = req.params.from
    to_date = req.params.to
    symbol = req.params.symbol
    console.log(from_date, to_date, symbol)
    yahooFinance.historical({
        symbol: symbol,
        from: from_date,
        to: to_date,
        // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
      }, function (err, quotes) {
            assert.equal(null,err)
            var response = []
            for(var i =0; i<50; i++)
            {
                response.push(quotes[i].date + "\n")
            }
            res.send(response)
      });
      console.log( (12).months().ago() )
    
})

app.get("/stock/insertBulk/duration", (req, res) => {

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
      
        const db = client.db(dbName);
      
        // Insert a single document
        db.collection('inserts').insertOne({a:1}, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
      
          // Insert multiple documents
          db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
            assert.equal(null, err);
            assert.equal(2, r.insertedCount);
      
            client.close();
          });
        });
      });
      
})
app.get("*", (req, res) => {
    res.redirect("/")
})
app.listen(port, () => console.log("Listening on port: " + port))