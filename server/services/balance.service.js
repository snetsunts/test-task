import {pool} from "../database/pool.js";

export class BalanceService {
    constructor(userId) {
        this.userId = userId;
    }

    subtract(amount) {
        // Так как у нас всего один запрос, мы можем просто использовать pool.query вместо коннекта к новому клиенту
        return pool.query(`
            UPDATE users SET amount = amount - $1 WHERE id = $2 AND amount - $1 >= 0 
        `, [amount, this.userId])
    }
}