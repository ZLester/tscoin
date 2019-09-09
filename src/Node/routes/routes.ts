import Node from '../Node';
import blockchainRoutes from './blockchainRoutes';
import idRoutes from './idRoutes';
import mineRoutes from './mineRoutes';
import nodeRoutes from './nodeRoutes';
import transactionRoutes from './transactionRoutes';

const routes = (node: Node) => {
    blockchainRoutes(node);
    idRoutes(node);
    mineRoutes(node);
    nodeRoutes(node);
    transactionRoutes(node);
};

export default routes;
