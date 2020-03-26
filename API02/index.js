const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/about',
{ useNewUrlParser: true,
  useUnifiedTopology: true
 }
);
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
//initialize routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    //console.log(err);
    res.status(422).send({err: err._message});
});

//Listen for request
app.listen(process.env.port || 4000, function() {
    console.log('connect');
});