const express = require('express');
const router = express.Router();
const About = require('../models/about');

//get a list of about from the db
router.get('/about', function(req, res){
    res.send({type: 'GET'});
});

//add a new about from the db
router.post('/about', function(req, res, next){
    About.create(req.body).then(function(about){
        res.send(about);
    }).catch(next);
});

//update a about from the db
router.put('/about/:id', function(req, res){
    res.send({type: 'PUT'});
});

//delete a about from the db
router.delete('/about/:id', function(req, res){
    res.send({type: 'DELETE'});
});

module.exports = router;