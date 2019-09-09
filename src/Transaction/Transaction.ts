import uuid from 'uuid/v1';

interface TransactionI {
    amount: number,
    sender: string,
    recipient: string,
    id: string,
    timestamp: number,
}

class Transaction implements TransactionI {
    amount: number;
    sender: string;
    recipient: string;
    id: string;
    timestamp: number;

    constructor (
        amount: number,
        sender: string,
        recipient: string,
        id: string = uuid().split('-').join(''),
        timestamp: number = Date.now(),
    ) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.id = id;
        this.timestamp = timestamp;
    }
}

export default Transaction;
