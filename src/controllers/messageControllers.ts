import { Request, Response } from "express"
import query from "../queries/queries"

interface PassportSession {
  passport?: {
    user: number;
  };
}

async function getAllMessages(req: Request, res: Response) {
    console.log(req.isAuthenticated())
    const messages = await query.messageGet(req.isAuthenticated())
    res.render("messageBoard", {messages})
}

async function createMessagePost(req: Request, res: Response) {
    const {title, message} = req.body
    const session = req.session as PassportSession;
    const id = session.passport?.user as number // временно
    await query.messagePost(title, message, id)
    res.redirect("/message")
}

async function createMessageGet(req: Request, res: Response) {
    res.render("messageForm")
}


export default {
    getAllMessages,
    createMessagePost,
    createMessageGet,
}