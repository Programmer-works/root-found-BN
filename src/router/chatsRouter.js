import express from 'express'
import ChatController from '../controller/chatController.js'


const router = express.Router()

router.post('/',ChatController.sendmessage)
router.get('/',ChatController.viewAllMessage)
router.delete('/:id',ChatController.deleteMessage)

export default router