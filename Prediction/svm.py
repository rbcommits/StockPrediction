import numpy as np
import math
import csv
from sklearn.svm import SVR
import pandas as pd
from sklearn import datasets, linear_model
from sklearn.model_selection import train_test_split
from matplotlib import pyplot as plt
file1 = open('C:\Parul\Sem2\Software webApps\hw3\AMZN_history.csv', 'r')# enter the name of the file to be opened
csv_f = csv.reader(file1)
data=[]
closing_data=[]
training_closing_price=[]

for row in csv_f:
    data.append(row)


for row1 in data:
    date.append(row1[1])
    rows_closing = float(row1[5])
    closing_data.append(rows_closing)

closing_data=closing_data[::-1]
forecast=3
train_closeX= closing_data
train_closeY= closing_data[forecast:]
x_forecast=train_closeX[-forecast:]
train_closeX=train_closeX[:-forecast]

X_train, X_test, y_train, y_test = train_test_split(train_closeX, train_closeY, test_size=0.2)
X_train=np.reshape(X_train,(len(X_train),1))
X_test=np.reshape(X_test,(len(X_test),1))
x_forecast=np.reshape(x_forecast,(len(x_forecast),1))

svr_lin=SVR(kernel='linear',C=1e3)
svr_rbf=SVR(kernel='rbf',C=1e3,gamma=0.1)


svr_lin.fit(X_train,y_train)
svr_rbf.fit(X_train,y_train)

accuracy_lin=svr_lin.score(X_test,y_test)
acc_rb=svr_rbf.score(X_test,y_test)

print('linear', accuracy_lin)
print('rb', acc_rb)

forecast_prediction_linear = svr_lin.predict(x_forecast)
for_rb= svr_rbf.predict(x_forecast)
print(forecast_prediction_linear)
print(for_rb)