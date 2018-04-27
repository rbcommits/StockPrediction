"use strict";

function initKafkaStream(symbols, cb) {
    console.log("Starting kafka stream....")
    const { KafkaStreams } = require("kafka-streams");
    const { nativeConfig: config } = require("./config_consumer.js");

    const kafkaStreams = new KafkaStreams(config);
    const stream = kafkaStreams.getKStream("AAPL");
    const streams = []
    symbols.forEach((symbol) => {
        streams.push(kafkaStreams.getKStream(symbol))
    })
    //adding a side effect call to the stream via tap
    streams.forEach((stream) => {
        stream.forEach((message) => {
            try {
                if (cb) {
                    cb(JSON.parse(message.value))
                }
                else {
                    console.log(JSON.parse(message.value))
                }
            }
            catch (err) {
                console.log("parse error " + message.value)
            }
        })
        stream.start().then(() => {
            console.log(" Stream Started ")
        })
    })


}

module.exports = {
    initKafkaStream
}
