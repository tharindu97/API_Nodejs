const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geolocation Schema
const GeoSchema = new Schema({
    type:{
        type:String,
        default:'Point'
    },
    coordinates:{
        type: [Number],
        index: '2dsphere'
    }
});

//create about Schema & model
const AboutSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Name field is required']
    },
    rank:{
        type: String
    },
    available:{
        type:Boolean,
        default:false
    },
    geometry: GeoSchema
});

const About = mongoose.model('about', AboutSchema);
module.exports = About;
