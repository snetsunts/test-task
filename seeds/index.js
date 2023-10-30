import {pool} from "../server/database/pool.js";

import { CreateUsersTable } from "./1698688837677-create-users-table.js";
const migrationsToRun = [CreateUsersTable];

async function setupMigrations() {
    await createMigrationsTable();
    await runMigrations();
}

async function createMigrationsTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            timestamp BIGINT NOT NULL, 
            name VARCHAR NOT NULL,
            created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
        )
    `)
}
async function runMigrations() {
    for(const migrationItem of migrationsToRun) {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            await migrationItem.up(client);
            await addMigrationRow(client, migrationItem.info);
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release()
        }
    }
}

async function addMigrationRow(client, info) {
    return client.query(`INSERT INTO migrations (timestamp, name) VALUES($1, $2)`, [info.timestamp, info.name])
}

export { setupMigrations }