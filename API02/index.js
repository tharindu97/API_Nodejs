const express = require('express');
const bodyParser = require('body-parser');

//Set up express app
const app = express();

app.use(bodyParser.json());
//initialize routes
app.use('/api', require('./routes/api'));

//Listen for request
app.listen(process.env.port || 4000, function() {
    console.log('connect');
});