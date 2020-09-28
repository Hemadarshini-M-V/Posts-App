var express = require('express');
var mongoose = require('mongoose');

var Post = require('../models/post');

//Creating an instance of Express router
var router = express.Router();

//Connecting to MongoDB cluster in the cloud
mongoose.connect("mongodb+srv://hems:6UU4a5qBKkcIHeAR@cluster0.wabii.mongodb.net/udemy-mean?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the cloud database");
})
.catch(err=>{
    console.log("Connection the cloud database failed!");
})

//Route handler to add a new post
router.post('/addPost',function(req,res,next){
  var newPost = new Post({
    title: req.body.title,
    content : req.body.content
  });
  newPost.save().then(sucRes=>{
    createdPostId = sucRes._id;
    res.json({"message":"Post added successfully ","id":createdPostId});
  });
})

//Route handler to fetch all posts
router.get('/fetchPosts', function(req, res, next) {
  Post.find()
    .then(documents=>{
      res.json(documents);
    })
});

//Route handler to delete a post based on id
router.delete('/deletePost/:id',function(req,res, next){
  postId = req.params.id;
  Post.deleteOne({_id:postId})
    .then((dat)=>{
      res.json({"message":"Post with id "+postId+" deleted successfully"});
    });

})

module.exports = router;
