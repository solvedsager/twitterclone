const express = require('express');
// const connectDB = require('./config/db');
const app = express();
const path = require('path');
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var bodyParser = require('body-parser');

//conn database func
// connectDB();


//init midwared
// app.use(express.json({ extended: false}));

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

var paramsA = {
  // id: 1387740758,
  // count: 10
  screen_name: '@realDonaldTrump'

}
let twitData;
const twitterData = T.get('users/show', paramsA, function(err, data, response) {
  // console.log(data)
  twitData = data;
});

var paramsB = {
  // id: 1387740758,
  screen_name: '@realDonaldTrump',
  count: 10
}

let twitDataC;
T.get('statuses/user_timeline', paramsB, function(err, data, response) {
  twitDataC = data;
  // console.log(data[0]);
});

var paramsD = {
  id: 1387740758,
  // count: 10
}

let twitDataD;
T.get('search/tweets', { q: 'trump since:2011-07-11', count: 10 }, function(err, data, response) {
  // console.log(data);
  twitDataD = data;
})

var paramsC = {
  status: 'hello'
}


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


function postStatus(params){
  console.log(params)
  var paramsC = {
    status: params
  }
  T.post('statuses/update', paramsC , function(err, data, response) {
    // console.log(data);
    console.log(paramsC);
  });
}






//define routes
app.get("/api/twitA", function(req, res, next) {
  res.send(twitData);
})

app.get("/api/twitC", function(req, res, next) {
  res.send(twitDataC);
})

app.get("/api/twitD", function(req, res, next) {
  res.send(twitDataD);
})

app.get("/api/twitE", function(req, res, next) {
  res.send(twitDataE);
})

let twitti;
app.get('/users/:userId', function (req, res) {
    // console.log('heyheyhey');
    // var params = {
    //     // id: 1387740758,
    //     // count: 10
    //     screen_name: '@realDonaldTrump'
      
    //   }
    var parameters = {
        // id: 1387740758,
        // count: 10
        screen_name: req.params.userId 
      }
    // var x = callStuff(req.params);
    let x;

    T.get('users/show', parameters, function(err, data, response) {
        // console.log(data);
        // console.log('hmm');
        twitti = data;
     })
     
     setTimeout(function(){ 
        res.send(twitti); }, 3000);
     });

app.get('/users/:userId/likes', function (req, res) {
  res.send('heller bud');
})

function callStuff(params) {
    var parameters = {
            // id: 1387740758,
            // count: 10
            screen_name: params.userId 
          }
    console.log(parameters.screen_name);
    let final;
    T.get('users/show', parameters, function(err, data, response) {
        // console.log(data)
        const enter = data
        return enter;
     });
     console.log(final);
}

app.post("/api/post", function(req, res, next) {
  console.log(req.body)
  console.log(req.body.status);
  // console.log(req);

//   postStatus(req.body.status);
  console.log('congrats');
  res.send('success');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
