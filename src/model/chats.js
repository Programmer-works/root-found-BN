import mongoose from "mongoose";

const chatSchemas = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },


})
const Chats = mongoose.model('Chats',chatSchemas)
export default Chats