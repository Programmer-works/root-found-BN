import mongoose from "mongoose";

const messageSchemas = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    campanyName:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
})
const Message = mongoose.model('Message',messageSchemas)
export default Message