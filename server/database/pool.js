import pg from 'pg'
import {configurations} from './../configs/index.js'

export const pool = new pg.Pool(configurations.database.config)