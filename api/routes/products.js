const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    console.log(product);
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /products',
            createProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:'No valid entry found for ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'Updated Products!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message:'Deleted Products!'
    });
});


module.exports = router;