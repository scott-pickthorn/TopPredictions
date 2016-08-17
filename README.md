# TopPredictions
Prediction software that uses machine learning to analyze data and help you choose your winning team.
install github repository
```git clone https://github.com/scott-pickthorn/TopPredictions```

install dependencies for node
```npm install```

```conda install pymongo```
```conda install numpy```
```conda install sklearn``` 

in a separatge command line

use mongo import to import the data.json file in the public folder
```mongoimport --db playerList --collection data --jsonArray --file TopPredictions/public/controllers/data.json```

run the mongo server

in another command prompt run the server
```node server```

in a browser go to `http://localhost:3000`

Todo(dev):
-implement datascraping and automation
-implement machine learning in node instead of python
-calculate errors
