import { config } from 'dotenv'
config()
import { pool } from "./database/pool.js";

console.log(pool)