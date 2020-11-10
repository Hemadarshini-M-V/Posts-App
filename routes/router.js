var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');

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

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

//Storage variable for multer configuration for image upload
var imgStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    var isValid = MIME_TYPE_MAP[file.mimetype];
    var error = new Error("Invalid mime type");  
    if(isValid)
      error = null;
    cb(error, './images');    // The path mentioned is relative to server.js file  
  },
  filename: (req, file, cb)=>{
    var fName = file.originalname.split(" ").join("_");
    var ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, fName + "." + ext);
  }
})

//Route handler to add a new post
router.post('/addPost', multer({storage: imgStorage}).single("image"), 
  function (req, res, next){
    var imgPath;
    if (req.body.image == "") {
      imgPath = "NO IMAGE";
    }
    else {
      const url = req.protocol + "://" + req.get('host');
      imgPath = url + "/resources/" + req.file.filename;
    }
    var newPost = new Post({
      title: req.body.title,
      content : req.body.content,
      imagePath : imgPath
    });
    newPost.save().then(sucRes=>{
      createdPostId = sucRes._id;
      res.json({"message":"Post added successfully ","id": createdPostId, 
        "imagePath": sucRes.imagePath});
    });
})

//Route handler to fetch all posts
router.get('/fetchPosts', function(req, res, next) {
  Post.find().then(documents=>{
      res.json(documents);
  })
});


//Route to fetch a particular post given id
router.get('/fetchPost/:id', function(req, res, next){
  var postId = req.params.id;
  Post.findById(postId).then(post=>{
    res.json(post);
  })
})

// Route to edit a post given the post id
router.put('/editPost/:id', multer({storage: imgStorage}).single("image"), 
  function(req, res, next){
    var imgPath;
    if (typeof req.body.imagePath == "string") {
      imgPath = req.body.imagePath;
    }
    else {
      const url = req.protocol + "://" + req.get('host');
      imgPath = url + "/resources/" + req.file.filename;
    }
    var editPost = new Post({  
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imgPath
    });
    Post.updateOne({_id: req.body.id},editPost).then(sucRes=>{
      res.json({"message": "Post with id "+editPost._id+" updated successfully"});
    })
})

// Route handler to delete a post based on id
router.delete('/deletePost/:id',function(req,res,next){
  postId = req.params.id;
  Post.deleteOne({_id:postId}).then((dat)=>{
      res.json({"message":"Post with id "+postId+" deleted successfully"});
  });
})

module.exports = router;
