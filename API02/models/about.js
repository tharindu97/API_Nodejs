const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

const About = mongoose.model('about', AboutSchema);
module.exports = About;
