# train
import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
iris = load_iris()

import pandas as pd
data=pd.DataFrame({
    'sepal length':iris.data[:,0],
    'sepal width':iris.data[:,1],
    'petal length':iris.data[:,2],
    'petal width':iris.data[:,3],
    'species':iris.target
})
data.head()
# ======================
X=data[['sepal length', 'sepal width', 'petal length', 'petal width']]  # Features
y=data['species']  # Labels

# Split dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3) # 70% training and 30% 

X_train
# ======================
X_test
# ======================
y_train
# ======================
y_test
# ======================
X_train.values.tolist()
# ======================
method_list = ["single_train", "train", "predict"]
method = method_list[1]
# ======================
# for train
train_data_len = 50
epoc = 5

print(f"method = {method}")
print(f"data = {X_train.values.tolist()[:train_data_len]}")
print(f"target = {[[i] for i in y_train.values.tolist()][:train_data_len]}")
print(f"epoc = {epoc}")
# ======================
# for predict
method = method_list[2]
target_test_data = 3

print(f"method = {method}")
print(f"data = {X_test.values.tolist()[target_test_data]}")
print(f"target = {y_test.values.tolist()[target_test_data]}")