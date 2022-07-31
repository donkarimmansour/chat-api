const mongoose = require('mongoose');

const messageSchema = mongoose.Schema ({
    senderId : {
        type : String,
        required : true
    },
    senderName : {
        type : String,
        required : true
    },
    reseverId : {
        type : String,
        required : true
    },
    message : {
        text : {
            type : String,
            default : ''
        }, 
        image: {
            type: mongoose.Schema.Types.ObjectId,
             ref : "file" ,
             required : false ,
             default: null
        },
        type : {
            type : String,
            // enum : ["file" , "img " , "msg"] ,
            default : 'msg'
        } 
    },
    status : {
        type : String,
        default : 'unseen'
    }
},{timestamps : true})

module.exports = mongoose.model('message',messageSchema);