const mongoose= require('mongoose');
const { type } = require('os');
const feedSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },subject: {
        type: String,
        required: true,
    },message: {
        type: String,
        required: true,
    },rating: {
        type: Number,
        required: true,
        min:1,
        max:5,
    }, date: {
        type: Date,
        default: Date.now(),
    },
});
module.exports=mongoose.model("Feedback",feedSchema)