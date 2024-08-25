
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { errormessage } from "../utilies/errormessage";

class Validation {
  public static inputValidator(req: Request, res: Response, next: NextFunction) {
    const errors=validationResult(req)
       
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          return errormessage(res,401,error.msg)
        });
    }else{
        return next()
    }
      
  }

  public static userAccountRule(){
     return [
        check("fullname","please correct your name").isString(),
        check("email","please correct your user name").isEmail(),
        check("password","please correct your strong password").isStrongPassword()
        
          
     ]
  }
}

export { Validation };
