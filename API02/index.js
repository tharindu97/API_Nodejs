const express = require('express');

//Set up express app
const app = express();

//initialize routes
app.use('/api', require('./routes/api'));

//Listen for request
app.listen(process.env.port || 4000, function() {
    console.log('connect');
});