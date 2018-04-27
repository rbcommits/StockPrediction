
export function getHighest(days, symbol) {
    var results = {}
    var days = req.params.days
    var sym = req.params.symbol
    var day = parseInt(days);
    var today = new Date();
    today.setDate(today.getDate() - day);
    console.log("date is " + today)

    MongoClient.connect(dbConnection, function (err, client) {
        //assert.equal(null, err);
        //console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        results = db.collection("AAPL").find({ date: { $gte: "2018-02-28T00:00:00.000Z" } }).sort({ "close": -1 }).limit(1).toArray(function (err, result) {

            if (err) {
                console.log("ERROR");
            }
            console.log(JSON.stringify(result));
            client.close();
        });
        //db.collection('historical').insertOne(data, function(err, r) {
        //assert.equal(null, err);
        //assert.equal(1, r.insertedCount);
        //console.log("Succesfully added data for: " + req.params.symbol)
        //console.log("The highest stock price in past " +days+ " is"+results);
        //client.close();
    });
    //results
    res.send("Asked for results");

}

export function getLowest(days, symbol) {
    var results = {}
    var days = req.params.days
    var sym = req.params.symbol
    var day = parseInt(days);
    var today = new Date();
    today.setDate(today.getDate() - day);
    console.log("date is " + today)
    MongoClient.connect(dbConnection, function (err, client) {
        //assert.equal(null, err);
        //console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        results = db.collection("AAPL").find({ date: { $gte: "2018-03-01T00:00:00.000Z" } }).sort({ "close": +1 }).limit(10).toArray(function (err, result) {
            if (err) {
                console.log("ERROR");
            }
            console.log(JSON.stringify(result));
            client.close();
        });
        //db.collection('historical').insertOne(data, function(err, r) {
        //assert.equal(null, err);
        //assert.equal(1, r.insertedCount);
        //console.log("Succesfully added data for: " + req.params.symbol)
        //console.log("The highest stock price in past " +days+ " is"+results);
        //client.close();
    });
    //results
    res.send("Asked for results");
}

export function getAverage(days, symbol) {
    var results = {}
    var days = req.params.days
    var sym = req.params.symbol
    var day = parseInt(days);
    MongoClient.connect(dbConnection, function (err, client) {
        //assert.equal(null, err);
        //console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        results = db.collection("historical").aggregate([
            { $limit: 365 },
            { $group: { "_id": null, "avg": { $avg: "$close" } } }

        ]);
        if (err) {
            console.log("ERROR");
        }
        console.log(JSON.stringify(result));
        client.close();
        //db.collection('historical').insertOne(data, function(err, r) {
        //assert.equal(null, err);
        //assert.equal(1, r.insertedCount);
        //console.log("Succesfully added data for: " + req.params.symbol)
        //console.log("The highest stock price in past " +days+ " is"+results);
        //client.close();
    });
    //results
    res.send("Asked for results");
}

export function getRawBetween(symbol, dateFrom, dateTo){
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
        assert.equal(null, err)
        var response = []
        for (var i = 0; i < 50; i++) {
            response.push(quotes[i].date + "\n")
        }
        res.send(response)
    });
    console.log((12).months().ago())
}

export function insertBulk(symbol, duration){
    data = []
    var d = new Date();
    d.setMonth(d.getMonth() - req.params.duration);
    yahooFinance.historical({
        symbol: req.params.symbol,
        from: d,
        to: null,
        // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
        assert.equal(null, err)
        quotes.forEach(function (row) {
            data.push({ "date": row.date, "open": row.open, "high": row.high, "low": row.low, "close": row.close, "volume": row.volume })
        });
        data = { "symbol": req.params.symbol, "data": data }
        console.log("Finished parsing data. Adding to database now")
        MongoClient.connect(dbConnection, function (err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Insert a single document
            db.collection('historical').insertOne(data, function (err, r) {
                assert.equal(null, err);
                assert.equal(1, r.insertedCount);
                console.log("Succesfully added data for: " + req.params.symbol)
                client.close();
            });
        });


    });

    res.send("Succesfully added data for: " + req.params.symbol)
}

export function initCronJob(){
    var CronJob = require('cron').CronJob;
new CronJob('*/60 * * * * *', function () {
    console.log("LAUNCHING JOB")

    data = []
    promises = []
    symbols.forEach(function (symbol) {
        promises.push(yahooFinance.quote({
            symbol: symbol,
            modules: ['summaryDetail', 'financialData'] // see the docs for the full list
        }, function (err, row) {

        }).then(function (res) {
            data.push({ "date": (new Date).toLocaleString(), "price": res.financialData.currentPrice, "volume": res.summaryDetail.volume })
        }))

    })

    Promise.all(promises).then(function (res) {
        MongoClient.connect(dbConnection, function (err, client) {

            if (err) {
                console.log(err)
            }
            else {
                const db = client.db(dbName);

                // Insert a single document
                for (var i = 0; i < 10; i++) {
                    db.collection(symbols[i]).insertOne(data[i], function (err, r) {
                    });
                }
                console.log("Succesfully added data for all companies ")
                client.close();
            }


        });
    })


}, null, true, 'America/Los_Angeles');
}
