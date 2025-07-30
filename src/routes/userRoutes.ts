import {Router} from "express"
import userControllers from "@/controllers/userControllers"

const router = Router()

router.post("sign-up", userControllers.createUserPost)
router.get("/", userControllers.getAllUsers)

export default router