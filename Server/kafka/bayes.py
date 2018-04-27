import numpy as np
import matplotlib.pyplot as plt
import matplotlib
import csv
import os

N = 10  # number of enteries to read
M = 9   #degree of polynomial
beta = 11.1
alpha = 0.05

def read_stock(name):
    file = open(name)
    data = csv.reader(file)
    prices = []
    for i, row in enumerate(data):
        if(i == 0): #skip headers
            continue
        if(i == N):
            actual_price = row[4] #(our N+1 value)
            break
        prices.append(row[4])
    # target is the price, training is the time
    targets = np.array(prices, dtype="float")
    training = np.array([i for i in range(len(targets))])
    file.close()
    
    return training, targets, float(actual_price)

def demo_read_stock(num):
    data = [
        [28.32, 28.5, 27.91, 27.37, 28.26, 28.55, 28.65, 29.05, 28.64, 28.110],
        [25.67, 26.87, 28.55, 29.32, 28.26, 28.55, 30.18, 32.11, 29.14, 28.11],
        [125.67, 126.87, 128.55, 132.44, 123.55, 128.88, 130.12, 134.5, 139.21, 137.45],
        [325.67, 331.87, 331.55, 330.42, 333.55, 332.88, 330.12, 334.5, 335.21, 334.45],
        [1325.67, 1321.87, 1331.55, 1334.42, 1333.15, 1328.88, 1324.12, 1330.35, 1335.21, 1334.45]
    ]
    targets = np.array(data[num], dtype="float")
    training = np.array([i for i in range(len(targets))])
    return training, targets
def normalize_data(training, targets):
    norm = np.max(targets)
    training = training/np.max(training)
    targets = targets/norm
    return training, targets, norm

def phi(x):
        return np.array([[x**i] for i in range(M + 1)])
def estimate(training, targets, norm):
    data = np.sum([phi(x).dot(phi(x).T) for x in training], axis=0)
    S = np.linalg.inv(np.array(beta*data + alpha*np.identity(M+1), dtype="float"))

    #equations for mean, variance
    def m(x):   # equation for mean
        result = np.sum([t*phi(a) for a, t in zip(training, targets)], axis=0)
        return beta*(phi(x).T).dot(S.dot(result))[0][0]

    def var(x): #equation for variance
        return (beta**-1 + (phi(x).T).dot(S.dot(phi(x))))[0][0]

    def plot_data(): # to plot the baesian curve and data points
        points = np.arange(0, 1, 0.01) #plot values over each time stamp to get curve
        plt.plot(points, [m(x) for x in points], color='0')
        for x, t in zip(training, targets):
            plt.scatter(x, t, color='b')
        
    plot_data()
    return float(m(1.01)*norm), m(1.01)

def main():
    results = open("result.csv", "w")
    for file in os.listdir("stock_data/"):
        plt.figure()
        print("Prediction for %s" % (file.replace(".csv", "")))
        training, targets, actual_price = read_stock("stock_data/%s"%file)
        training, targets, norm = normalize_data(training, targets)

        prediction, _ = estimate(training, targets, norm)
        absolute_error = (prediction - actual_price)
        relative_error = absolute_error/actual_price*100
        print("Actual Price: ", actual_price)
        print("Predicted Price: ", prediction)
        print("Absolute Error: ", absolute_error )
        print("Relative Error: ", relative_error)
        print("================================")
        results.write("%s, %s, %s, %s, %s \n"%(file.replace(".csv", ""), actual_price, prediction, absolute_error, relative_error))
        plt.title(file.replace(".csv", ""))
        plt.show()
    results.close()

def demo():
    plt.figure()
    training, targets = demo_read_stock(2)
    training, targets, norm = normalize_data(training, targets)

    prediction, n_prediction = estimate(training, targets, norm)
    plt.scatter(1.02, n_prediction, color='r')
    print("Predicted Price: ", prediction)
    plt.show()
if __name__ == '__main__':
    #main()
    demo()