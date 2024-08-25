import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
   newsTitle: {
        type:String,
        required:true
    },
    newsImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    newsDescription: {
        type:String,
        required:true
    },
    postedAt: {
        type:Date,
        default: new Date(Date.now()),
    },
})

const News = mongoose.model("News", newsSchema)

export default News