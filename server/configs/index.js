import {config} from 'dotenv'
config()

export const configurations = {
    system: {
        port:  parseInt(process.env.APP_PORT, 10),
    },
    database: {
        config: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            max: parseInt(process.env.DB_POOL_SIZE, 10),
            idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MS, 10),
            connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT_MS, 10),
        },
        seeding: {
            user: {
                username: process.env.SEED_USER_USERNAME,
                amount: process.env.SEED_USER_AMOUNT
            }
        }
    },
}