# Run one section at a time in your browser
import numpy as np
import pandas as pd
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
digits = load_digits()

data=pd.DataFrame(digits.data, columns=digits.feature_names)
data.head()
# ======================
target=pd.DataFrame(digits.target, columns=['target'])
target.head()
# ======================
X=data[digits.feature_names]  # Features
y=target['target']  # Labels

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
method_list = ["single_train", "train", "predict"]
# ======================
# for train
# If there is already some output in the Terminal, press the Terminal Clear button before executing.
# After completing this section, you can run Training in Canister by pressing the Training button at the bottom of your browser.
method = method_list[1]
train_data_len = 50
epoc = 5

print(f"method = {method}")
print(f"data = {X_train.values.tolist()[:train_data_len]}")
print(f"target = {[[i] for i in y_train.values.tolist()][:train_data_len]}")
print(f"epoc = {epoc}")
# ======================
# for predict
# If there is already some output in the Terminal, press the Terminal Clear button before executing.
# After completing this section, you can run Predict in Canister by pressing the Predict button at the bottom of your browser.
method = method_list[2]
target_test_data = 1

print(f"method = {method}")
print(f"data = {X_test.values.tolist()[target_test_data]}")
print(f"target = {y_test.values.tolist()[target_test_data]}")
# ======================
# for predict all
# If there is already some output in the Terminal, press the Terminal Clear button before executing.
# After completing this section, you can run Predict All in Canister by pressing the Predict All button at the bottom of your browser.
method = method_list[2]

print(f"method = {method}")
print(f"data = {X_test.values.tolist()}")
print(f"target = {y_test.values.tolist()}")