import messageControllers from "../controllers/messageControllers"
import {Router} from "express"

const router = Router()

router.get("/", messageControllers.getAllMessages)

export default router