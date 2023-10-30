export function balanceSubtractMiddleware(request, response, next) {
    const userId = parseInt(request.params.userId, 10);
    if (!userId) {
        response.status(400).send({message: 'Invalid user ID'})
        return;
    }

    const {amount} = request.body
    if (!parseInt(amount, 10)) {
        response.status(400).send({message: 'Invalid amount'})
        return;
    }

    if (amount > 32000) {
        response.status(400).send({message: 'Amount can not be greater than 32000'})
        return;
    }

    next()
}