import Message from "../model/chats.js";
import errormessage from "../utils/errorMessage.js";
import successMessage from '../utils/successMessage.js';

class ChatController {
    static async sendmessage(req,res){
        const {fullName,className,message} = req.body

        try {
            const messages = await Message.create({fullName,className,message})
            if(messages){
                return successMessage(res,201,`message sent`,messages)
            }else{
                return errormessage(res,401,`message not sent`)
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return errormessage(res, 500, `internal server error`)
        } 
    }
    static async viewAllMessage(req,res){
        const message= await Message.find();
        if(message){
            return successMessage(res,200,`all messages retrived`,message)
        }else{
            return errormessage(res,400,`no messages found`)
        }
    }

    static async deleteMessage(req,res){
        const messageID = req.params.id;
        const messages = await Message.findByIdAndDelete(messageID)

        if(messages){
            return successMessage(res,200,`message deleted`,messages)
        }else{
            return errormessage(res,400,`message not deleted`)
        }
    }
}
export default ChatController