import {Router} from "express"
import basicController from "../controllers/basicController" 

const router = Router()

router.get("/", basicController.getWelcomPage)

export default router