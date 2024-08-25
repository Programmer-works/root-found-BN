import express,{Request,Response} from 'express'
import { User } from '../model/user'
import { errormessage } from '../utilies/errormessage'
import { successmessage } from '../utilies/successmessage'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




class userController{
    public static async createuser(req:Request,res:Response):Promise<void>{
        const {fullname,email,password,confirmpassword,role}=req.body
           if(req.body.password !== req.body.confirmpassword){
              return errormessage(res,401," please password and confrim password miss macth")
           }else{
               const hashpassword=bcrypt.hashSync(req.body.password,10)
               const hashconfrim=bcrypt.hashSync(req.body.password,10)

               try {
                const user = await User.create({fullname,email,password:hashpassword,confirmpassword:hashconfrim,role})
                if(!user){
                   return errormessage(res,401,"no user found")
                }else{
                  return successmessage(res,201,"user successfuly created",user)
                }
               } catch (error) {
                   console.log(error)
               }
           }  
    }


    public static async Login(req:Request,res:Response):Promise<void>{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return errormessage(res,401,'Invalid email or password')
        }else{
            const comparepassword=bcrypt.compareSync(password,user.password)
            if(!comparepassword){
                return errormessage(res,401,"Invalid email or password")
            }else{
                const SCRET_KY="franklin"
                const token=jwt.sign({user:user},SCRET_KY,{expiresIn:"1d"})
               res.status(201).json({
                     token:token,
                     data:{
                        user:user
                     }
                })
            }
        }
    }



    public static async getusers(req:Request,res:Response):Promise<void>{
         try {
            const users=await User.find()
              if(!users){
                 return errormessage(res,401,"no user found in database")
              }else{
                return successmessage(res,200,`all ${users.length} users retrived`,users)
              }
            
         } catch (error) {
            console.log(error)
         } 
    }

    public static async deleteusers(req:Request,res:Response):Promise<void>{
        try {
           const users=await User.deleteMany()
             if(!users){
                return errormessage(res,401,"no user found in database")
             }else{
               return successmessage(res,200,`all  users deleted`,null)
             }
           
        } catch (error) {
           console.log(error)
        }   
   }

   public static async getOneUsers(req:Request,res:Response):Promise<void>{
       const id=req.params.id
    try {

       const users=await User.findById(id)
         if(!users){
            return errormessage(res,401,"no user found in database")
         }else{
           return successmessage(res,200,` users on this id ${id} retrived`,users)
         }
       
    } catch (error) {
       console.log(error)
    }
   
}

public static async deleteOneUsers(req:Request,res:Response):Promise<void>{
    const id=req.params.id
 try {

    const users=await User.findByIdAndDelete(id)
      if(!users){
         return errormessage(res,401,"no user found in database")
      }else{
        return successmessage(res,201,` users on this id ${id} deleted`,null)
      }
    
 } catch (error) {
    console.log(error)
 }

}

public static async updateUsers(req:Request,res:Response):Promise<void>{
    const id=req.params.id
 try {

    const users=await User.findByIdAndUpdate(id,req.body,{new:true})
      if(!users){
         return errormessage(res,401,"no user found in database")
      }else{
        return successmessage(res,201,` users on this id ${id} updated`,users)
      }
    
 } catch (error) {
    console.log(error)
 }

}

}

export {userController}