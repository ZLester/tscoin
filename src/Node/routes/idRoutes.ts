import Node from '../Node';
import { Request, Response, NextFunction } from 'express';
import Blockchain from '../../Blockchain/';

export default (node: Node) => {
    node.app.route('/id')
        .get((
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            res.json({
                ok: true,
                data: {
                    id: node.id,
                },
            });
        });
}
