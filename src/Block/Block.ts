import Transaction from '../Transaction/';

export type BlockData = {
    index: number,
    transactions: Transaction[],
};

interface BlockI {
    hash: string,
    index: number,
    nonce: number,
    previousBlockHash: string,
    timestamp: number,
    transactions: Transaction[],
};

class Block implements BlockI {
    hash: string;
    index: number;
    nonce: number;
    previousBlockHash: string;
    timestamp: number;
    transactions: Transaction[];

    constructor (
        index: number,
        nonce: number,
        hash: string,
        previousBlockHash: string,
        transactions: Transaction[],
        timestamp: number = Date.now(),
    ) {
        this.index = index;
        this.nonce = nonce;
        this.hash = hash;
        this.previousBlockHash = previousBlockHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
    }
}

export default Block;
