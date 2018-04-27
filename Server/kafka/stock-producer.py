from socketIO_client_nexus import SocketIO, LoggingNamespace, BaseNamespace
import ujson
import random
from kafka import KafkaProducer
import time
import RNN
import svm

_SIO_URL_PREFIX = 'https://ws-api.iextrading.com'
_SIO_PORT = 443
SYMBOLS = ["AAPL", "MSFT", "AABA", "ACN", "ADP", "FB", "AMZN", "GOOGL", "IBM", "LMT"]



producer = KafkaProducer(bootstrap_servers='127.0.0.1:9092', value_serializer=lambda v: ujson.dumps(v).encode('utf-8'))
socketIO = SocketIO(_SIO_URL_PREFIX, _SIO_PORT)
#socketIO.define(LoggingNamespace, path='/1.0/tops')


def predict(data):
    ''' 
    dummy pyspark function. Use as wrapper and add all predictions here 
    
    data: dict object of the form:
    {
        symbol: ,
        marketPercent:
        bidSize:
        bidPrice:
        askSize:
        askPrice:
        volume:
        lastSalePrice: "Use this price for prediction"
        lastSaleSize:
        lastSaleTime: "Use this time for prediction" might Need to encode it as a date. Currently it's number of milliseconds since 1970
        lastUpdated:
        sector:
        securityType:

    } These values are all unicode strings! parse to int/float as needed 
    '''

    x = data["lastSalePrice"]





    predicted_price = float(data['lastSalePrice'])
    return random.uniform(predicted_price - 15, predicted_price + 15) # for now just return random value. Should Return predicted price


def predict_historical(data, days_ahead):
    '''
    dummy pyspark function. Use as wrapper and add all predictions here

    data: dict object of the form:
    {
        symbol:
        date:
        open:
        high:
        low:
        close:
        volume:

    } These values are all unicode strings! parse to int/float as needed
    '''

    x = data["close"]
    symbol = data["symbol"]
    prediction = svm.predict(symbol, days_ahead, x)

    return prediction


def tryJSON(data):
    try:
        return ujson.loads(data)
    except ValueError:
        return data


def write_to_kafka(data):
    producer.send(data['symbol'], data)


i = 0


class Namespace(BaseNamespace):
    def on_connect(self, *data):
        print('conneced')

    def on_disconnect(self, *data):
        print('disconnected')

    def on_message(self, data):
        global i
        data = tryJSON(data)
        predicted_price = predict(data)
        data['nextPredictedPrice'] = predicted_price
        print(str(data['lastSalePrice']), " ", i)
        write_to_kafka(data)
        if data['symbol'] == "AAPL":
            i+=1
        ''' Call all pyspark related functions here!! '''



namespace = socketIO.define(Namespace, '/1.0/tops')
#namespace.emit('subscribe', 'AAPL')

    
#loop for testing purpose only!
for symbol in SYMBOLS:
    namespace.emit('subscribe', symbol)
    print("subscribed to ", symbol)




socketIO.wait()
