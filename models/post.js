const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title:String,

    message:String,

    selectedFile:String,

    likeCount:{
        type:[String],
        default:[]
    },
    comments:{type:[String],default:[]},
    
    createdAt:{
        type:Date,
        default:new Date()
    },
})

const PostMessage = mongoose.model('Authentication_Internship_Posts',PostSchema)

module.exports = PostMessage

