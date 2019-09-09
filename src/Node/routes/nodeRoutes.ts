import Node from '../Node';
import { Request, Response, NextFunction } from 'express';
import Blockchain from '../../Blockchain/';
import axios from 'axios';

const call = (promise: Promise<any>) => promise
    .then(data => ([ null, data ]))
    .catch(err => ([ err ]));

export default (node: Node) => {
    node.app.route('/node')
        .post((
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const { url } = req.body;

            node.blockchain.addNetworkNode(url);

            res.status(201).json({
                ok: true,
                note: `Added ${url} to blockchain networkNodes`,
            });
        });

    node.app.route('/node/bulk')
        .post((
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const { urls } = req.body;

            node.blockchain.addNetworkNode(...urls);

            res.status(201).json({
                ok: true,
                note: `Added urls to blockchain networkNodes`,
            });
        });

    node.app.route('/node/broadcast')
        .post(async (
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const { url } = req.body;

            node.blockchain.addNetworkNode(url);

            // TODO
            // const broadcasts = await Promise.all(
            //     [...node.blockchain.networkNodes]
            //         .filter(url => node.url !== url)
            //         .map(url => (
            //             call(axios.post(`${url}/node`, { url }))
            //         ))
            // );

            res.status(201).json({
                ok: true,
                note: `Broadcast ${url} to other nodes`,
            });
        });
}
