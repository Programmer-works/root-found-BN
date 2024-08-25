import express,{Router} from "express"

import userRouter from "../routes/userRoutes"
import newsRoutes from "../routes/newsRoutes"
import memberRoutes from "../routes/memberRoutes"

const router:Router=express.Router()
router.use("/user",userRouter)
router.use("/news",newsRoutes)
router.use("/member",memberRoutes)
export default router