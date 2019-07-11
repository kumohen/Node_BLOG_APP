
const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose.connect('mongodb://mahen:12345a@ds349587.mlab.com:49587/blog-clean',{ useNewUrlParser: true })
    .then(()=>{
    console.log("mongodb is connected");
})

// Post.create({
//     title:"Second post",
//     description:"this is my third course in node js",
//     content:"i like it111"
// },(error,post)=>{
//     console.log(error,post)
// })
// Post.find({},(error,posts)=>{
//     console.log(error,posts);
// })
// Post.findById('5d25870219ac4806ac40b382',(error,post)=>{
//     console.log(error,post)
// })

// Post.findByIdAndUpdate("5d25870219ac4806ac40b382",{
//     title: 'Second post!!!!!!'
// },(error,post)=>{
//     console.log(error,post);
// })
