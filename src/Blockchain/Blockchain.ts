import Block, { BlockData } from '../Block/';
import Transaction from '../Transaction/';
import sha256 from 'sha256';

interface BlockchainI {
    chain: Block[],
    pendingTransactions: Transaction[],

    createBlock: (
        nonce: number,
        previousBlockHash: string,
        hash: string,
    ) => Block,
    getLastBlock: () => Block,
    hashBlock: (
        block: BlockData,
        previousBlockHash: string,
        nonce: number,
    ) => string,
    createTransaction: (
        amount: number,
        sender: string,
        recipient: string,
    ) => number,
    proofOfWork: (
        block: BlockData,
        previousBlockHash: string,
    ) => number,
};

class Blockchain implements BlockchainI {
    chain: Block[] = [];
    pendingTransactions: Transaction[] = [];

    constructor (
        genesisNonce: number,
        genesisPreviousBlockHash: string,
        genesisHash: string,
    ) {
        this.createBlock(
            genesisNonce,
            genesisPreviousBlockHash,
            genesisHash,
        );
    }

    createBlock (
        nonce: number,
        previousBlockHash: string,
        hash: string,
    ) {
        const block = new Block(
            this.chain.length,
            nonce,
            hash,
            previousBlockHash,
            this.pendingTransactions,
        );

        this.pendingTransactions = [];
        this.chain.push(block);

        return block;
    }

    hashBlock (
        block: BlockData,
        previousBlockHash: string,
        nonce: number,
    ) {
        const blockString = `${previousBlockHash}${nonce}${JSON.stringify(block)}`;
        return sha256(blockString);
    }

    getLastBlock () {
        return this.chain[this.chain.length - 1];
    }

    createTransaction (
        amount: number,
        sender: string,
        recipient: string,
    ) {
        const newTransaction = new Transaction(
            amount,
            sender,
            recipient,
        );

        this.pendingTransactions.push(newTransaction);

        const lastBlock = this.getLastBlock();

        return lastBlock.index + 1;
    }

    proofOfWork (
        block: BlockData,
        previousBlockHash: string,
        startingNonce: number = 0,
    ) {
        let nonce = startingNonce;
        let hash = this.hashBlock(block, previousBlockHash, nonce);

        while (hash.slice(0, 4) !== '0000') {
            nonce++;
            hash = this.hashBlock(block, previousBlockHash, nonce);
        }

        return nonce;
    }
}

export default Blockchain;
