interface TransactionI {
    amount: number,
    sender: string,
    recipient: string,
}

class Transaction implements TransactionI {
    amount: number = null;
    sender: string = null;
    recipient: string = null;

    constructor (
        amount: number,
        sender: string,
        recipient: string,
    ) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
    }
}

export default Transaction;
