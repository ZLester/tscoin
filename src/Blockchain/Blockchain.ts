import Block, { BlockData } from '../Block/';
import Transaction from '../Transaction/';
import Reward from '../Reward/';

import sha256 from 'sha256';

interface BlockchainI {
    chain: Block[],
    pendingTransactions: Transaction[],
    networkNodes: string[],
    miningReward: Reward,

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
    miningReward = new Reward();
    networkNodes: string[] = [];
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
            0,
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

        // Index of block the transaction will be mined in
        return lastBlock.index + 1;
    }

    proofOfWork (
        block: BlockData,
        previousBlockHash: string,
        startingNonce: number = 0,
    ) {
        let nonce = startingNonce;
        let hash = this.hashBlock(block, previousBlockHash, nonce);

        while (hash.slice(0, 4) !== '0000') { // TODO
            nonce++;
            hash = this.hashBlock(block, previousBlockHash, nonce);
        }

        return nonce;
    }

    addNetworkNode (...urls: string[]) {
        const networkNodesSet = new Set(this.networkNodes);

        urls.forEach(url => networkNodesSet.add(url));

        this.networkNodes = [...networkNodesSet];
    }

    removeNetworkNode (...urls: string[]) {
        const networkNodesSet = new Set(this.networkNodes);

        urls.forEach(url => networkNodesSet.delete(url));

        this.networkNodes = [...networkNodesSet];
    }
}

export default Blockchain;
