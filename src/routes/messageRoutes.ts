import messageControllers from "../controllers/messageControllers"
import {Router} from "express"

const router = Router()

router.get("/", messageControllers.getAllMessages)
router.get("/create", messageControllers.createMessageGet)
router.post("/create", messageControllers.createMessagePost)

export default router