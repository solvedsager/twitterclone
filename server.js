const express = require('express');
const app = express();
const path = require('path');
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

let twitti;
app.get('/users/:userId', function (req, res) {

    var parameters = {
        screen_name: req.params.userId 
      }
    let x;

    T.get('users/show', parameters, function(err, data, response) {
        twitti = data;
     })
     
     setTimeout(function(){ 
        res.send(twitti); }, 3000);
});

// new custom route

let twitus;
app.get('/statuses/:userId', function (req, res) {

    var parameters = {
        screen_name: req.params.userId,
        count: 10
      }
    let x;

    T.get('statuses/user_timeline', parameters, function(err, data, response) {
        twittus = data;
     })
     
     setTimeout(function(){ 
        res.send(twittus); }, 3000);
});

// old crusty

var paramsD = {
  id: 1387740758,
  // count: 10
}

let twitDataD;
T.get('search/tweets', { q: 'trump since:2011-07-11', count: 10 }, function(err, data, response) {
  // console.log(data);
  twitDataD = data;
})

app.get("/api/twitD", function(req, res, next) {
  res.send(twitDataD);
})

// final endpoint

var paramsB = {
  // id: 1387740758,
  screen_name: '@realDonaldTrump',
}

let twitDataE;
T.get('favorites/list', paramsB, function(err, data, response) {
  twitDataE = data;
  // console.log(data[0]);
});

app.get("/api/twitE", function(req, res, next) {
  res.send(twitDataE);
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
