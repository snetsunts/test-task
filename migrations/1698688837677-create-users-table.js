export const CreateUsersTable = {
    info: {
        name: 'CreateUsersTable',
        timestamp: 1698688837677
    },
    async up(client) {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR NOT NULL UNIQUE, 
                amount SMALLINT NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
            )
        `)
    },

    async down(client) {
        await client.query(`DROP TABLE IF EXISTS users`)
    },

    async isExecuted(client) {
        const {rows: [{count}]} = await client.query('SELECT COUNT(*) FROM migrations WHERE name = $1', ['CreateUsersTable']);
        return Boolean(parseInt(count, 10));
    }
}