import express,{Request,Response} from 'express'
import { successmessage } from '../utilies/successmessage'
import { errormessage } from '../utilies/errormessage'
import News from '../model/news'
import cloudinary from '../utilies/cloud'
class newsController {
   public static async postNews(req:Request, res:Response):Promise<void>{
        try {
            const { newsTitle, newsDescription } = req.body;
            
            if (!req.file) {
                return errormessage(res,400,`please upload image`)
            }
            
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'news'
            });
            
            
            const news = await News.create({
                newsImage: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                newsTitle,
                newsDescription,
               
            });
            
            if (!news) {
                return errormessage(res,401,`Failed to create news`)
            }
            return successmessage(res,201,`news posted successfully`,news)
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res,500,`internal server error`)
        }
    }
    
public static async getAllNews(req:Request,res:Response):Promise<void>{
    try {
        const news = await News.find();
        if (news) {
            return successmessage(res,200,` all News retrived`,news)
        } else {
            return errormessage(res,401,`failed to retrived`)
        }
    } catch (error) {
        console.log(`error is :`,error)
    }
}

public static async getOneNews(req:Request,res:Response):Promise<void>{
    try {
        const id = req.params.id
        const news = await News.findById(id)
         if (news) {
            return successmessage(res,200,`data retrived successfully`,news)
         } else {
            return errormessage(res,401,`no data found`)
         }
    } catch (error) {
        
    }
}
public static async deleteNews(req:Request,res:Response):Promise<void>{
    try {
        const news = await News.deleteMany();
        if(news){
            return errormessage(res,201,`news deleted successfully`)
        }else{
            return errormessage(res,401,`news not deleted`)
        }
    } catch (error) {
        
    }
}

public static async deleteOneNews(req:Request,res:Response):Promise<void>{
    try {
        const newsId = req.params.id
        const news = await News.findByIdAndDelete(newsId);
        if(news){
            return errormessage(res,201,`news deleted successfully`)
        }else{
            return errormessage(res,401,`news not deleted by ${newsId}`)
        }
    } catch (error) {
        
    }
}
public static async updateNews(req:Request,res:Response):Promise<void>{
    try {
        const newsId = req.params.id
        const news = await News.findByIdAndUpdate(newsId, req.body, {new : true})
        if(news){
            return successmessage(res,200,`news successfully updated`,news)
        }
    } catch (error) {
        
    }
}
}
export default newsController