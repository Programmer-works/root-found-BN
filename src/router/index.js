import express from "express"
import memberRoutes from "../router/memberRouter.js"
import studentRouter from "../router/studentRouter.js"
import messageRouter from "../router/messageRouter.js"


const router=express.Router()

router.use('/member',memberRoutes)
router.use('/student',studentRouter)
router.use('/messages',messageRouter)

export default router