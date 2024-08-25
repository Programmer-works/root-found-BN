import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    signedAt:{
       type:Date,
       default:new Date(Date.now())
    }

})
const User=mongoose.model("User",userschema)
export  {User}