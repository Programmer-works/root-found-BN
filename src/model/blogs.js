import mongoose from "mongoose";

const blogSchemas = new mongoose.Schema({
    blogName: {
        type:String,
        required:true
    },
    blogImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    blogStatus: {
        type:String,
        required:true
    },
    blogDescription: {
        type:String,
        required:true
    },
    postedAt: {
        type:Date,
        default: new Date(Date.now()),
    },


})
const Blogs = mongoose.model('Blogs',blogSchemas)
export default Blogs