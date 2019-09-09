import Blockchain from '../Blockchain';
import express, { Application } from 'express';
import http, { Server } from 'http';
import Logger from './Logger';
import middleware from './middleware';
import routes from './routes/';
import uuid from 'uuid/v1';

class Node {
    public app: Application = express();
    public blockchain: Blockchain;
    public id: string = uuid().split('-').join('');
    public logger: Logger = new Logger();
    public server: Server;
    public url: string;

    constructor (blockchain: Blockchain, url: string) {
        this.blockchain = blockchain;
        this.url = url;

        this.server = this.createServer(this.app);

        this.mountMiddleware(this);
        this.mountRoutes(this);
    }

    private mountMiddleware (
        node: Node,
    ) {
        middleware(node);
    }

    private mountRoutes (
        node: Node,
    ) {
        routes(node);
    }

    private createServer (app: Application) {
        return http.createServer(app);
    }

    public listen (port: string) {
        this.server.listen(
            port,
            () => console.log(`Listening on port ${port}`),
        );
    }
}

export default Node;
