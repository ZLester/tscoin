import { Application, Request, Response, NextFunction } from 'express';
import Blockchain from '../Blockchain/';

export default (app: Application, blockchain: Blockchain, nodeAddress: string) => {
    app.get('/', (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        res.json({ ok: true });
    });

    app.get('/blockchain', (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        res.json(blockchain);
    });

    app.post('/transaction', (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const {
            amount,
            recipient,
            sender,
        } = req.body;

        const invalidProperties = [
            {
                key: 'amount',
                value: amount,
            },
            {
                key: 'recipient',
                value: recipient,
            },
            {
                key: 'sender',
                value: sender,
            },
        ].filter(property => !property.value);


        if (invalidProperties.length) {
            res.status(400).json({
                ok: false,
                error: `Transaction must include ${invalidProperties.map(property => property.key).join(', ')}`
            });

            return;
        }

        const blockIndex = blockchain.createTransaction(
            amount,
            sender,
            recipient,
        );

        res.status(201).json({
            ok: true,
            data: {
                blockIndex,
            },
            note: `Transaction will be included in block ${blockIndex}`,
        });
    });

    app.post('/mine', (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const lastBlock = blockchain.getLastBlock();
        const newBlockData = {
            index: lastBlock.index + 1,
            transactions: blockchain.pendingTransactions,
        };
        const newBlockNonce = blockchain.proofOfWork(
            newBlockData,
            lastBlock.hash
        );
        const newBlockHash = blockchain.hashBlock(
            newBlockData,
            lastBlock.hash,
            newBlockNonce,
        );
        const block = blockchain.createBlock(
            newBlockNonce,
            lastBlock.hash,
            newBlockHash,
        );

        const reward = 100; // TODO

        const rewardBlockIndex = blockchain.createTransaction(
            reward,
            'MINING_REWARD',
            nodeAddress,
        );

        res.status(201).json({
            ok: true,
            data: {
                block,
                reward: {
                    amount: reward,
                    blockIndex: rewardBlockIndex,
                    recipient: nodeAddress,
                },
            },
            note: `Block mined successfully`,
        });
    });
};
