import {Router} from "express"
import userControllers from "@/controllers/userControllers"
import passport from "passport"

const router = Router()

router.post("/sign-up", userControllers.createUserPost)
router.get("/sign-up", userControllers.createUserGet)
router.get("/log-in", userControllers.loginUserGet)
router.post("/login", passport.authenticate('local', {
    successRedirect: '/message',
    failureRedirect: '/user/login',
    failureFlash: false
}))
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/message");
  });
});
router.get("/", userControllers.getAllUsers)
router.get("/profile", userControllers.getUser)

export default router