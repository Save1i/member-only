import { Request, Response } from "express"
import query from "../queries/queries"

async function getAllMessages(req: Request, res: Response) {
    console.log(req.isAuthenticated())
    const messages = await query.messageGet(req.isAuthenticated())
    console.log(messages)
    res.render("messageBoard", {messages})
}

export default {
    getAllMessages,
}