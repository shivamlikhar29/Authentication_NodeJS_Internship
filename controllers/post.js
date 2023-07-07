const mongoose = require('mongoose')
const PostMessage = require('../models/post')

const createPost = async (req,res) => {
    const post = req.body
    try{
        const newPost = new PostMessage({...post,createdAt:new Date().toISOString()})
        await newPost.save()
        return res.status(201).json({message:"New Post Created Successfully",newPost})

    }catch(error){
        return res.status(409).json({message:error.message})
    }
}

const getPost = async (req,res) => {

    try{
        const newPost = await PostMessage.find()
        return res.status(201).json(newPost)

    }catch(error){
        return res.status(409).json({message:error.message})
    }
}

const updatePost = async(req,res) =>{
    const { id:_id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")
 
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ ...post},{new:true});
    res.status(201).json({message:"Post updated successfully",updatedPost})
 }

const deletePost = async (req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    await PostMessage.findByIdAndRemove(id)

    res.status(202).json({message:'Post deleted successfully'})
}

const likePost = async (req, res) => {

    const { id } = req.params

    if(!req.userId) return res.json({message:'Uauthenticated'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

    const post = await PostMessage.findById(id)

    const index = post.likeCount.findIndex((id)=>id == String(req.userId))

    if(index == -1){
        post.likeCount.push(req.userId)
    }else{
        post.likeCount = post.likeCount.filter((id)=> id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})

    res.status(201).json({message:"Post likes updated successfully",updatedPost})
}

const commentPost = async (req, res) => {
    const { id } = req.params

    const { comment } = req.body

    const post = await PostMessage.findById(id)

    post.comments.push(comment)

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    
    res.status(201).json({message:"Comment added successfully",updatedPost})
}



module.exports = {
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    commentPost
}

