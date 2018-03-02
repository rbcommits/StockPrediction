const port = 3000

const express = require("express"), expressLogging = require('express-logging'), logger = require('logops');
const date = require("datejs");
const MongoClient = require('mongodb').MongoClient;
const yahooFinance = require("yahoo-finance")
const assert = require("assert")
const app = express();

const symbols = ["AAPL", "MSFT", "AABA", "ACN", "ADP", "FB", "AMZN", "GOOGL", "IBM", "LMT"]
const dbName = "stock_data"
const dbConnection = "mongodb://raghav:pN98TwHxbGz6@ds046357.mlab.com:46357/stock_data"
//Start the schedular to fetch data every minute

var CronJob = require('cron').CronJob;
new CronJob('*/60 * * * * *', function() {
    console.log("LAUNCHING JOB")
    
    data = []
    promises = []
        symbols.forEach(function(symbol) {
           promises.push( yahooFinance.quote({
            symbol: symbol,
            modules: [ 'summaryDetail', 'financialData'] // see the docs for the full list
          }, function (err, row) {
                //console.log(row)
            //data.push({ "date": row.date, "open": row.open, "high": row.high, "low": row.low, "close": row.close})
          }).then(function(res){
              data.push({ "date": Date.today(), "price": res.financialData.currentPrice, "volume": res.summaryDetail.volume } )
              //console.log(data)
              //console.log("===================================")
          }))

        })

        Promise.all(promises).then(function(res){
            MongoClient.connect(dbConnection, function(err, client) {
                assert.equal(null, err);
                
              
                const db = client.db(dbName);
              
                // Insert a single document
                for(var i = 0; i<10; i++)
                {
                    db.collection(symbols[i]).insertOne(data[i], function(err, r) {
                  assert.equal(null, err);
                  assert.equal(1, r.insertedCount);
                
                    
                  });
                }
            console.log("Succesfully added data for all companies ")
            client.close(); 
            });
        })
        

}, null, true, 'America/Los_Angeles');


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

app.get("/stock/insertBulk/:symbol/:duration", (req, res) => {

    data = []
    var d = new Date();
    d.setMonth(d.getMonth()-req.params.duration);
    yahooFinance.historical({
        symbol: req.params.symbol,
        from: d,
        to: null,
        // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
      }, function (err, quotes) {
            assert.equal(null,err)
            quotes.forEach(function(row){
                data.push({ "date": row.date, "open": row.open, "high": row.high, "low": row.low, "close": row.close, "volume": row.volume})
            });
            data = {"symbol": req.params.symbol, "data": data}
            console.log("Finished parsing data. Adding to database now")
            MongoClient.connect(dbConnection, function(err, client) {
                assert.equal(null, err);
                console.log("Connected correctly to server");
              
                const db = client.db(dbName);
              
                // Insert a single document
                db.collection('historical').insertOne(data, function(err, r) {
                  assert.equal(null, err);
                  assert.equal(1, r.insertedCount);
                    console.log("Succesfully added data for: " + req.params.symbol)
                    client.close();
                  });
                });
              
            
      });
    
    /*
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
      */
      res.send("Succesfully added data for: " + req.params.symbol)
      
})
app.get("*", (req, res) => {
    res.redirect("/")
})
app.listen(port, () => console.log("Listening on port: " + port))
