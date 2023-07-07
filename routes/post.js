const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { createPost, updatePost, deletePost, likePost, commentPost, getPost } = require('../controllers/post')

router.get('/',getPost)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
router.post('/:id/commentPost',auth,commentPost)

module.exports = router