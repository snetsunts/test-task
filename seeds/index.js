import {pool} from "../server/database/pool.js";

import { AddUsers } from "./1698688837678-add-users.js";
const seedsToRun = [AddUsers];

async function setupSeeds() {
    console.log('Seeding: Started ⏳ ...');
    await createSeedsTable();
    await runSeeds();
    console.log('Seeding: Finished ✔️');
}

async function createSeedsTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS seeds (
            id SERIAL PRIMARY KEY,
            timestamp BIGINT NOT NULL, 
            name VARCHAR NOT NULL UNIQUE,
            created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
        )
    `)
}
async function runSeeds() {
    for(const seedItem of seedsToRun) {
        const client = await pool.connect()
        try {
            if (await seedItem.isExecuted(client)) {
                return
            }
            await client.query('BEGIN')
            await seedItem.up(client);
            await addSeedRow(client, seedItem.info);
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release()
        }
    }
}

async function addSeedRow(client, info) {
    return client.query(`INSERT INTO seeds (timestamp, name) VALUES($1, $2)`, [info.timestamp, info.name])
}

export { setupSeeds }