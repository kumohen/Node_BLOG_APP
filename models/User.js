const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,'Provide Your Username']
  },
  email:{
      type:String,
      required:true,
      unique:[true,'Write your email']
  },
  password:{
    type:String,
    required:[true,'password should greater than 5'],
    min:5
  }
})

UserSchema.pre('save',function(next){
    const user = this ;
    bcrypt.hash(user.password,10,function(error,encryted){
        user.password = encryted 
        next()
    })
})

const User = mongoose.model('User',UserSchema);

module.exports = User ;