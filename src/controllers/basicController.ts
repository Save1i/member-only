import { Request, Response } from "express";

function getWelcomPage(req: Request, res: Response) {
    res.render("welcomePage")
}

export default {
    getWelcomPage,
}