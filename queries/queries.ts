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

export default {
    insertUser,
    getAllUsers,
}