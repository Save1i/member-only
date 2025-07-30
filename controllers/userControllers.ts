import { Request, Response } from "express";
import query from "../queries/queries"

async function createUserPost(req: Request, res: Response) {
    const {firstName, lastName, nickname, password} = req.body
    await query.insertUser(firstName, lastName, nickname, password)
    res.json({firstName, lastName, nickname, password})
}

async function getAllUsers(req: Request, res: Response) {
    const users = await query.getAllUsers()
    res.json(users)
}

export default {
    createUserPost,
    getAllUsers,
}