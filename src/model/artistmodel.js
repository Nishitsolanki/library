const mongoose = require('mongoose')

const artistschema = new mongoose.Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    grammy:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false

    }
    
},{timestamps:true})

module.exports = mongoose.model('artist',artistschema)