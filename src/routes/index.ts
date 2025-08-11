import {Router} from "express"
import userRouter from "./userRoutes"
import messageRouter from "./messageRoutes"
import basicRouter from "./basicRouter"

const router = Router()

router.use("/", basicRouter)
router.use("/user", userRouter)
router.use("/message", messageRouter)

export default router