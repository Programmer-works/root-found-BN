import express from "express"
import memberRoutes from "../router/memberRouter.js"
// import studentRouter from "../router/studentRouter.js"


const router=express.Router()

router.use('/member',memberRoutes)
// router.use('/student',studentRouter)

export default router