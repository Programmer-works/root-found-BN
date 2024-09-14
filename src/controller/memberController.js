import bcrypt from 'bcrypt'
import errormessage from '../utils/errorMessage.js'
import successmessage from '../utils/successMessage.js'
import cloudinary from '../utils/cloud.js'
import Member from '../model/members.js'
import jwt from 'jsonwebtoken'

class MemberController {
    static async createMember(req,res){
        try {
            const { userName, email, course, password, role } = req.body;
    
            if (!req.file) {
                return errormessage(res, 400, 'Please upload an image');
            }
    
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'member'
            });
    
            const hashedPassword = bcrypt.hashSync(password, 10);
    
            const member = await Member.create({
                memberImage: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                userName,
                email,
                course,
                password: hashedPassword, // Store the hashed password
                role
            });
    
            if (!member) {
                return errormessage(res, 401, 'Failed to create member');
            }
    
            return successmessage(res, 201, 'Member created successfully', member);
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, 'Internal server error');
        }
    }
    static async viewMembers(req,res){
        const member = await Member.find()
        if(member){
            return successmessage(res,200,`members retrived successfully`,member)
        }else{
            return errormessage(res,400,`member not found`)
        }
    }
    static async viewMember(req,res){
        const memberID = req.params.id
        const member = await Member.findById(memberID)
        if(member){
            return successmessage(res,200,`retrived member successfully`,member)
        }else{
            return errormessage(res,401,`no member found`)
        }
    }
    static async deleteMember(req,res){
        const memberID = req.params.id
        const member = await Member.findByIdAndDelete(memberID)
        if(member){
            return errormessage(res,200,`member deleted succefully`)
        }else{
            return errormessage(res,400,`no member found by ${memberID}`)
        }
    }
    static async updateMember(req,res){
        const memberID = req.params.id
        const member = await Member.findByIdAndUpdate(memberID,req.body,{new:true})
        if(member){
            return successmessage(res,200,`member updated successfully`,member)
        }else{
            return errormessage(res,401,`member not updated`)
        }
    }
    static async Login(req,res){
        const {email,password}=req.body
        const user = await Member.findOne({email})
        if(!user){
           return errormessage(res,401,'invalid email or password')
        }else{
           const comparepassword=bcrypt.compareSync(password,user.password)
           if(!comparepassword){
               return errormessage(res,401,'invalid email or password')
           }else{
              const token=jwt.sign({user:user},process.env.SCRET_KEY,{expiresIn:"1d"})
            //   sendLoginEmail(user)
              return res.status(200).json({
               token:token,
               data:{
                user:user
               }
             })
           }
        }
    }
}
export default MemberController