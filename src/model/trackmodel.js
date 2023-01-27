const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const trackschema = new mongoose.Schema({
    id:{
        type:String
    },

    name:{
        type:String,
        required:true,
        trim:true,
    },
    artistId:{
        type:ObjectId,
        ref:"artist"
    },
    duration :{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model('tracks',trackschema)

