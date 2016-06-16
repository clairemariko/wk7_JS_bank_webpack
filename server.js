var express = require('express');
//express is a function that is now assigned to the variable app
var app = express();
//this is a took to make a path directory
var path = require('path');
//requiring from the filesystem
// var fs = require ('fs')
//a capital for things that are constant. look in the current directory and find the sample.json file. __dirname this creates an absoulute path instead of using the ..
// var ACCOUNTS_FILE = path.join(__dirname + '/sample.json')
var MongoClient = require('mongodb').MongoClient;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



//making a request to the accounts in sample.json file
app.get('/accounts', function(req,res){
  var url = 'mongodb://localhost:27017/bank';
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log(err);
      return;
    }
    var collection = db.collection('accounts');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    })
  })
});


  //we want to read this file. firt thing we want to do is check if we have anerror and data.
//fs is an object that already exisits in node and readFile is a method availble on fs. readFile will always have these two things (where to find it and what to do with it)
//   fs.readFile(ACCOUNTS_FILE, function(err, data){
// //when it reads a file that is read as a string which will return as json even though it original format is in json
//     if(err){
//       console.log('err');
//       return;
//     }
//     res.json(JSON.parse(data))
//   })
// });




//this gives a path to the client folder and the file build
app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
