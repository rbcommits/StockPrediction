"use strict";

const log4bro = require("log4bro");

const config = {
    //zkConStr: "localhost:2181/", //can also connect to zookeeper instead of kafka (older clients)
    kafkaHost: "127.0.0.1:9092", //connects directly to brokers
    logger: new log4bro({ level: "INFO" }),
    groupId: "kafka-streams-stock",
    clientName: "kafka-streams-stock-consumer",
    workerPerPartition: 1,
    options: {
        sessionTimeout: 8000,
        protocol: ["roundrobin"],
        fromOffset: "earliest", //latest
        fetchMaxBytes: 1024 * 100,
        fetchMinBytes: 1,
        fetchMaxWaitMs: 10,
        heartbeatInterval: 250,
        retryMinTimeout: 250,
        autoCommit: true,
        autoCommitIntervalMs: 1000,
        requireAcks: 0,
        //ackTimeoutMs: 100,
        //partitionerType: 3
    }
};

const nativeConfig = {
    noptions: {
        "metadata.broker.list": "127.0.0.1:9092", //native client requires broker hosts to connect to
        "group.id": "kafka-streams-stock-native",
        "client.id": "kafka-streams-stock-consumer",
        "event_cb": true,
        "compression.codec": "snappy",
        "api.version.request": true,

        "socket.keepalive.enable": true,
        "socket.blocking.max.ms": 100,

        "enable.auto.commit": false,
        "auto.commit.interval.ms": 100,

        "heartbeat.interval.ms": 250,
        "retry.backoff.ms": 250,

        "fetch.min.bytes": 100,
        "fetch.message.max.bytes": 2 * 1024 * 1024,
        "queued.min.messages": 100,

        "fetch.error.backoff.ms": 100,
        "queued.max.messages.kbytes": 50,

        "fetch.wait.max.ms": 1000,
        "queue.buffering.max.ms": 1000,

        "batch.num.messages": 10000
    },
    tconf: {
        "auto.offset.reset": "earliest", //consumer offset latest/earliest
        "request.required.acks": 1 //producer requires ack
    }
};

module.exports = {
    config,
    nativeConfig
};
