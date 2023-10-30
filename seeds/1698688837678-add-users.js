import {configurations } from '../server/configs/index.js'

export const AddUsers = {
    info: {
        name: 'AddUsers',
        timestamp: 1698688837678
    },
    async up(client) {
        await client.query(`
            INSERT INTO users (username, amount) VALUES ()
        `)
    },

    async down(client) {
        await client.query(`DROP TABLE IF EXISTS users`)
    }
}