import express,{Request,Response,NextFunction} from "express"
import { User } from "../model/user"
import { errormessage } from "../utilies/errormessage"


class DataCheckers{

    public static async userRegistIsEmpty(req:Request,res:Response,next:NextFunction):Promise<void>{
        const {fullname,email,password,confrimpassword,message}=req.body

        if(fullname===""){
            return errormessage(res,401,'please provide your fullname name')
        }else if(email===""){
            return errormessage(res,401,'please provide your email')
        }else if(password===""){
            return errormessage(res,401,'please provide your password')
        }else if(confrimpassword===""){
            return errormessage(res,401,'please provide your confrim password')
        }else if(message===""){
            return errormessage(res,401,'please provide your message')
        }else{
            return next()
        }
    }

     public static async emailExist(req:Request,res:Response,next:NextFunction):Promise<void>{

        const email=req.body.email
        const user=await User.findOne({email})
          if(user){
            return errormessage(res,401,'please user allredy exist')
          }else{
            return next()
          }
     }


}
export {DataCheckers}