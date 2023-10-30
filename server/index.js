import express from 'express';
import {configurations} from './configs/index.js'
import {setupMigrations} from './../migrations/index.js'
import {setupSeeds} from './../seeds/index.js'

// Services
import {BalanceService} from './services/balance.service.js'
import {balanceSubtractMiddleware} from "./middlewares/balance-subtract.middleware.js";


/*
 !!!!! ВАЖНО !!!!!!

 1. В большинстве случаев оставлю комменты на русском, чтобы было более понятно
 2. В задании было сказано именно "запустить миграции при старте", иначе создал бы отдельную комманду для этого
*/


const app = express();
app.use(express.json())

app.post(`/api/users/:userId`, balanceSubtractMiddleware, async (request, response) => {
    const { userId } = request.params;
    const { amount } = request.body;

    const balanceService = new BalanceService(userId);
    try {
        // Если запрос что-то изменил в БД, нам вернется rowCount: 1
        const { rowCount } = await balanceService.subtract(amount);
        if (rowCount) {
            response.status(200).send({ message: 'Success' });
        } else {
            response.status(400).send({ message: 'You do not have enough funds in your account to make the transaction' });
        }
    } catch (err) {
        console.log('ERR:', err);
        response.status(500).send({message: 'Something went wrong!'})
    }
})

// Запуск миграции
setupMigrations()
    .then(() => {
        // Запуск сидеров
        return setupSeeds()
    })
    .then(() => {
        // Запуск приложения
        app.listen(configurations.system.port, () => {
            console.log('App listening on port', configurations.system.port)
        })
    })

