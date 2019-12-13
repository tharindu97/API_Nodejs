const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST request to /products'
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === '2'){
        res.status(200).json({
            message: 'You discovered the 2 ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
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