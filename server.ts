import {config} from "dotenv"
import express, { Request, Response } from "express"
import router from "@/routes/index"
import path from "path"
import passport from "passport"
import session from "express-session"
import { Strategy as LocalStrategy } from 'passport-local';
import { Pool } from 'pg';
import pgSession from "connect-pg-simple";
import queries from "@/queries/queries"
import bcrypt from 'bcrypt'

config()
const app = express()
app.set('views', path.join(__dirname, '/src/views'))
app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const PgSession = pgSession(session);

app.use(session({
  store: new PgSession({
    pool: pgPool,
    tableName: 'session',
  }),
  secret: process.env.FOO_COOKIE_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(( { usernameField: 'nickname', passwordField: 'password' }), 
  async (nickname, password,done) => {
        console.log("LocalStrategy called:", nickname); 
    try {
      const rows  = await queries.getUserByName(nickname)
      const user = rows[0];

      const match = await bcrypt.compare(password, user.password)

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: Express.User, done) => {
  console.log("Serializing user:", user);
    done(null, (user as any).id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await queries.getUserById(id);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use("/", router)

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});