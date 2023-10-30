import {configurations} from '../server/configs/index.js'


const { username, amount } = configurations.database.seeding.user;

export const AddUsers = {
    info: {
        name: 'AddUsers',
        timestamp: 1698688837678
    },
    async up(client) {
        await client.query('INSERT INTO users (username, amount) VALUES ($1, $2)', [username, amount])
    },

    async down(client) {
        await client.query('DELETE FROM users WHERE username = $1', username)
    },

    async isExecuted(client) {
        const {rows: [{count}]} = await client.query('SELECT COUNT(*) FROM seeds WHERE name = $1', ['AddUsers']);
        return Boolean(parseInt(count, 10));
    }
}