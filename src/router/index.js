import express from "express"
import memberRoutes from "../router/memberRouter.js"
import studentRouter from "../router/studentRouter.js"
import messageRouter from "../router/messageRouter.js"
import chatsRouter from "../router/chatsRouter.js"
import blogRouter from "../router/blogsRouter.js"


const router=express.Router()

router.use('/member',memberRoutes)
router.use('/student',studentRouter)
router.use('/messages',messageRouter)
router.use('/chats',chatsRouter)
router.use('/blogs',blogRouter)

export default router