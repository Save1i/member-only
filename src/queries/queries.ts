import {neon} from "@neondatabase/serverless"
import {config} from "dotenv"
config()
const sql = neon(process.env.DATABASE_URL as string);

async function insertUser(firstName: string, lastName: string, nickname: string, password: string) {
    await sql.query("INSERT INTO Users (first_name, last_name, nickname, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, nickname, password])
}

async function getAllUsers() {
    const users = await sql.query("SELECT * FROM Users")
    return users
}

async function getUserByName(nickname: string) {
    const rows = await sql.query("SELECT * FROM Users WHERE nickname=$1", [nickname])
    console.log(rows)
    return rows
}

async function getUserById(id: number) {
    const rows = await sql.query("SELECT * FROM Users WHERE id=$1", [id])
    return rows
}

async function messageGet(isAuth: boolean) {
    let rows;
    if(isAuth) {
        rows = await sql.query("SELECT messages.id, title, message, nickname FROM Messages LEFT JOIN USERS ON USERS.ID = Messages.ID")
    } else {
        rows = await sql.query("SELECT * FROM Messages")
    }
    return rows
}

export default {
    insertUser,
    getAllUsers,
    getUserByName,
    getUserById,
    messageGet,
}