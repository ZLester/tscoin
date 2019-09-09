import Node from '../Node';
import { Request, Response, NextFunction } from 'express';
import Blockchain from '../../Blockchain/';

export default (node: Node) => {
    node.app.route('/transaction')
        .post((
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const {
                amount,
                recipient,
                sender,
                timestamp,
                id,
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
                            {
                    key: 'timestamp',
                    value: timestamp,
                },
                            {
                    key: 'id',
                    value: id,
                },
            ].filter(property => !property.value);


            if (invalidProperties.length) {
                res.status(400).json({
                    ok: false,
                    error: `Transaction must include ${invalidProperties.map(property => property.key).join(', ')}`
                });

                return;
            }

            const blockIndex = node.blockchain.createTransaction(
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
}
