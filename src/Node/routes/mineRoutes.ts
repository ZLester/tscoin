import Node from '../Node';
import { Request, Response, NextFunction } from 'express';
import Blockchain from '../../Blockchain/';

export default (node: Node) => {
    node.app.route('/mine')
        .post((
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const lastBlock = node.blockchain.getLastBlock();
            const newBlockData = {
                index: lastBlock.index + 1,
                transactions: node.blockchain.pendingTransactions,
            };
            const newBlockNonce = node.blockchain.proofOfWork(
                newBlockData,
                lastBlock.hash
            );
            const newBlockHash = node.blockchain.hashBlock(
                newBlockData,
                lastBlock.hash,
                newBlockNonce,
            );
            const block = node.blockchain.createBlock(
                newBlockNonce,
                lastBlock.hash,
                newBlockHash,
            );

            const rewardBlockIndex = node.blockchain.createTransaction(
                node.blockchain.miningReward.amount,
                node.blockchain.miningReward.key,
                node.id,
            );

            res.status(201).json({
                ok: true,
                data: {
                    block,
                    reward: {
                        amount: node.blockchain.miningReward,
                        blockIndex: rewardBlockIndex,
                        recipient: node.id,
                    },
                },
                note: `Block mined successfully`,
            });
        });
}
