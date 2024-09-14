import bcrypt from 'bcrypt'
import errormessage from '../utils/errorMessage.js'
import successmessage from '../utils/successMessage.js'
import cloudinary from '../utils/cloud.js'
import Blogs from '../model/blogs.js'
import jwt from 'jsonwebtoken'

class BlogsController {
    static async createBlogs(req,res){
        try {
            const { blogName, blogStatus, blogDescription} = req.body;
    
            if (!req.file) {
                return errormessage(res, 400, 'Please upload an image');
            }
    
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'blogs'
            });
    
            const blogs = await Blogs.create({
                blogImage: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                blogName,
                blogStatus,
                blogDescription,
            });
    
            if (!blogs) {
                return errormessage(res, 401, 'Failed to create blogs');
            }
    
            return successmessage(res, 201, 'Blogs created successfully', blogs);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }
    static async viewBlogs(req,res){
        const blogs = await Blogs.find()
        if(blogs){
            return successmessage(res,200,`blogs retrived successfully`,blogs)
        }else{
            return errormessage(res,400,`blogs not found`)
        }
    }
    static async viewBlog(req,res){
        const blogID = req.params.id
        const blogs = await Blogs.findById(blogID)
        if(blogs){
            return successmessage(res,200,`retrived blog successfully`,blogs)
        }else{
            return errormessage(res,401,`no blogs found`)
        }
    }
    static async deleteBlog(req,res){
        const blogID = req.params.id
        const blogs = await Blogs.findByIdAndDelete(blogID)
        if(blogs){
            return errormessage(res,200,`blogs deleted succefully`)
        }else{
            return errormessage(res,400,`no blogs found by ${blogID}`)
        }
    }
    static async updateBlog(req,res){
        const blogID = req.params.id
        const blogs = await Blogs.findByIdAndUpdate(blogID,req.body,{new:true})
        if(blogs){
            return successmessage(res,200,`blogs updated successfully`,blogs)
        }else{
            return errormessage(res,400,`no blog updated`)
        }
    }
}
export default BlogsController