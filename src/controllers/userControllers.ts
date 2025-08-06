import { NextFunction, Request, Response } from "express";
import query from "../queries/queries"
import bcrypt from "bcrypt"
import passport from "passport"
import { body, validationResult } from "express-validator";

interface PassportSession {
  passport?: {
    user: number;
  };
}

async function createUserPost(req: Request, res: Response) {
    const info = req.body
    const warning = validationResult(req).array()
    if(warning.length > 0) {
        return res.render('registration', {warning, info})
    }
        const {firstName, lastName, nickName, password} = req.body
    try {
        const existingUser = await query.getUserByName(nickName)
        if(existingUser.length > 0) {
            const warning = [{msg: "Nickname already taken"}] 
            return res.render('registration', {warning, info})
        }
        const hashPasword = await bcrypt.hash(password, 10)
        console.log(info, "post")
        await query.insertUser(firstName, lastName, nickName, hashPasword)
        return res.redirect('/user/log-in')
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Server error" });
    }
   
}

async function createUserGet(req: Request, res: Response) {
    const info = req.body
    console.log(info, "get")
    const warning = validationResult(req).array()
    res.render('registration', {warning, info})
}

async function loginUserGet(req: Request, res: Response) {
  const messages = req.session.messages || [];
  const errorMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  req.session.messages = [];

  res.render("login", { errorMessage });
}

async function getAllUsers(req: Request, res: Response) {
    if(req.isAuthenticated()) {
        const users = await query.getAllUsers()
        console.log(users, "users")
        return users
    } else {
        res.redirect("/user/login")
    }
}

async function getUser(req:Request, res: Response) {
    const isAuth = req.isAuthenticated()
    const session = req.session as PassportSession;
    const id = session.passport?.user as number // временно
    const user = await query.getUserById(id)
    res.render("profile", {user, isAuth})

}

export default {
    createUserPost,
    createUserGet,
    getAllUsers,
    loginUserGet,
    getUser,
}