from pymongo import MongoClient
import numpy as np 


cl = MongoClient()
db = cl.playerList

collection = db.playerList
cursor = collection.find()
feature = list()
target = list()
i = 0
for doc in cursor:
	feature.append([ doc['passYds'], doc['passTds'], doc['passInt'], doc['rushYds']])
	target.append([doc['pts']])
	i += 1
X = np.asarray(feature)
y = np.asarray(target, dtype="|S6")

from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=.5)

def train(clf, features, labels):
	return clf.fit(features, labels)

def predict(clf, features):
	return clf.predict(features)

from sklearn import tree
my_classifier = tree.DecisionTreeClassifier()

my_classifier = train(my_classifier, X_train, y_train)
predictions = predict(my_classifier, X_test)

from sklearn.metrics import accuracy_score

for x in range(0, 10):
	print (predictions[x], "<--->", y_test[x])

#print(accuracy_score(y_test, predictions))


