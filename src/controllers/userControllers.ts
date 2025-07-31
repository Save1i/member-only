import { NextFunction, Request, Response } from "express";
import query from "../queries/queries"
import bcrypt from "bcrypt"
import passport from "passport"

async function createUserPost(req: Request, res: Response) {
    const {firstName, lastName, nickName, password} = req.body
    const hashPasword = await bcrypt.hash(password, 10)
    await query.insertUser(firstName, lastName, nickName, hashPasword)
    res.json({firstName, lastName, nickName, password})
}

async function createUserGet(req: Request, res: Response) {
    res.render('registration', {req})
}

async function loginUserGet(req: Request, res: Response) {
    res.render('login', {req})
}

async function getAllUsers(req: Request, res: Response) {
    if(req.isAuthenticated()) {
        const users = await query.getAllUsers()
        console.log(users)
        return users
    } else {
        res.redirect("/user/login")
    }
}

export default {
    createUserPost,
    createUserGet,
    getAllUsers,
    loginUserGet,
}