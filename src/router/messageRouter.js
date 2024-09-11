import express from 'express'
import MessageController from '../controller/messageController.js'


const router = express.Router()

router.post('/',MessageController.sendmessage)
router.get('/',MessageController.viewAllMessage)
router.delete('/:id',MessageController.deleteMessage)

export default router