const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb+srv://Tharindu97:Tharindu1997@node-shop-pghg6.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
//initialize routes
app.use('/api', require('./routes/api'));

//Listen for request
app.listen(process.env.port || 4000, function() {
    console.log('connect');
});