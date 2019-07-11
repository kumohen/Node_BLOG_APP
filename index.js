require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const session = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");
const edge = require("edge.js");
const cloudinary = require("cloudinary");

const Post = require("./models/post");
const createPostController = require("./controllers/createPost");
const singlePostController = require("./controllers/getSinglePost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const registerController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/loginController");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logoutController");

const app = express();



mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true })
    .then(()=>{
    console.log("mongodb is connected");
})

app.use(connectFlash());

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME
})

const mongoStore = connectMongo(session);
app.use(session({
    secret: process.env.EXPRESS_SESSION_KEY,
    store:new mongoStore({
        mongooseConnection: mongoose.connection
    })
   
  }))

app.use(fileUpload());
app.use(express.static('public'));
app.use(require('express-edge'));



app.set('views', `${__dirname}/views`);

app.use("*",(req,res,next)=>{
    edge.global('auth',req.session.userId);
    next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const postvalidator = require('./middleware/storePost');
const authmiddleware = require('./middleware/auth');
const redirectIfAuth = require('./middleware/redirect');



app.get('/',homePageController);
app.get('/posts/new',authmiddleware,createPostController);
app.post('/posts/store',authmiddleware,postvalidator,storePostController);
app.get('/post/:id',singlePostController);

//user routes
app.get('/users/logout',authmiddleware,logoutController);

app.get('/users/login',redirectIfAuth,loginController);

app.post('/users/login',redirectIfAuth,loginUserController);

app.get('/users/register',redirectIfAuth,registerController);
app.post('/users/register',redirectIfAuth,storeUserController);





app.use((req,res)=> res.render('notFound'));

var port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("everything is Okk ")
})