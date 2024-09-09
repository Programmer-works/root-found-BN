import User from "../model/members.js";
import errormessage from '../utils/errorMessage.js'

class DataChecker {
    static userRegisterIsEmpty=(req,res,next)=>{
        const {userName, role,course,email,password}=req.body
      

        if(userName==""){
            return errormessage(res,401,`please provide your userName`)
        }
    
        else if(email==""){
            return errormessage(res,401,`please provide yuor email`)
        }
        else if(password==""){  
            return errormessage(res,401,`please provide yuor password`)
        }
        else if(course==""){  
            return errormessage(res,401,`please provide yuor course`)
        }
        else if(role==""){  
            return errormessage(res,401,`please provide yuor role`)
        }
        else{
            return next()
        }
    }
static async emailExist(req,res,next){
    const email = req.body.email;
    const user = await User.findOne({email})

    if(user){
        return errormessage(res,401,`already email exist`)
    }else{
        return next()
    }
}
}
export default DataChecker