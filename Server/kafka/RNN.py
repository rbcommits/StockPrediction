from keras.models import Sequential
from keras.models import load_model
from keras.layers import Dense, Activation
from keras.layers import LSTM
import numpy as np
import math
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error

import matplotlib.pyplot as plt


def train(company_name):
    name = company_name
    data = np.load(name+"_data_20180423.npy")
    dataX = data[0:data.shape[0]-2]
    dataY = data[1:data.shape[0]-1]
    # plt.plot(dataX)
    # plt.show()

    # Normalize data between 0 and 1
    scaler = MinMaxScaler(feature_range=(0, 1))
    dataX = [[d] for d in dataX]
    dataY = [[d] for d in dataY]
    scaled_dataX = scaler.fit_transform(dataX)
    scaled_dataY = scaler.fit_transform(dataY)

    # Train on 80% of the data
    train_count = int(0.8 * scaled_dataX.shape[0])
    test_count = scaled_dataX.shape[0] - train_count
    train_dataX = scaled_dataX[0:train_count]
    test_dataX = scaled_dataX[train_count:scaled_dataX.shape[0]]

    # Reshape
    train_dataX = [[d] for d in train_dataX]
    test_dataX = [[d] for d in test_dataX]

    # Generate labels
    train_dataY = scaled_dataY[0:train_count]
    test_dataY = scaled_dataY[train_count:scaled_dataX.shape[0]]

    step_size = 1

    model = Sequential()
    model.add(LSTM(32, input_shape=(1, step_size), return_sequences = True))
    model.add(LSTM(16))
    model.add(Dense(1))
    model.add(Activation('linear'))

    # Training
    model.compile(loss='mean_squared_error', optimizer='adagrad') # Try SGD, adam, adagrad and compare!!!
    model.fit(train_dataX, train_dataY, epochs=5, batch_size=1, verbose=2)

    # Testing
    trainPredict = model.predict(train_dataX)
    testPredict = model.predict(test_dataX)

    print("Error: ", np.average(abs(test_dataY - testPredict)))

    # plt.plot(testPredict)
    # plt.plot(test_dataY)
    # plt.show()

    # Save model
    model.save(company_name+'_model')


def predict(symbol, data):

    sym_to_name = {"ACN": "accenture", "ADP": "adp", "AABA": "altaba", "AMZN": "amazon", "AAPL": "apple", "FB": "facebook",
                   "GOOGL": "google", "IBM": "ibm", "LMT": "lockheed", "MSFT": "msft"}

    model = load_model(sym_to_name[symbol]+"_model")
    scaler = MinMaxScaler(feature_range=(0, 1))
    dataX = [[d] for d in data]
    scaled_dataX = scaler.fit_transform(dataX)
    scaled_dataX = [[d] for d in scaled_dataX]

    scaled_prediction = model.predict(scaled_dataX)
    prediction = scaler.inverse_transform(scaled_prediction)
    return prediction[len(prediction) - 1]


# # ACCENTURE
# train("accenture")
#
# # ADP
# train("adp")
#
# # ALTABA
# train("altaba")
#
# # AMAZON
# train("amazon")
#
# # APPLE
# train("apple")
#
# # FACEBOOK
# train("facebook")
#
# # GOOGLE
# train("google")
#
# # IBM
# train("ibm")
#
# # LOCKHEED
# train("lockheed")

# MICROSOFT
# train("msft")

'''TESTING'''
lock_data = [322.9, 323.17, 323.08, 323.08, 323.23, 323.69, 323.63, 323.83, 323.94, 323.9]
print(predict("LMT", lock_data))


