import {Router} from "express"
import userRouter from "./userRoutes"
import messageRouter from "./messageRoutes"

const router = Router()

router.use("/user", userRouter)
router.use("/message", messageRouter)

export default router