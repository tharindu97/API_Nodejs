const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price_id')
    .exec()
    .then(docs =>{
        const response ={
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/" + doc._id
                    }
                }
            })
        };
        console.log(response);
        res.status(200).json(response);
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
            message: 'Created product successfully',
            createProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/products/" + result._id
                }
            }
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
    .select('name price_id')
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/products/"
                }
            });
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

    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.proName] = ops.value;
    }
    Product.update({ _id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product Update',
            request: {
                type: 'GET',
                url: "http://localhost:5000/products/" + id
            }
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'Product Deleted',
            request: {
                type: 'POST',
                url: "http://localhost:5000/products/",
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});


module.exports = router;