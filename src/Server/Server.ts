import Blockchain from '../Blockchain';
import express, { Application } from 'express';
import http, { Server as HttpServer } from 'http';
import middleware from './middleware';
import routes from './routes';
import uuid from 'uuid/v1';

class Server {
    private blockchain: Blockchain;
    public app: Application;
    public nodeId: string;
    public server: HttpServer;

    constructor (blockchain: Blockchain) {
        this.app = express();
        this.blockchain = blockchain;
        this.nodeId = uuid().split('-').join('');

        this.mountAppMiddleware(this.app);
        this.mountAppRoutes(this.app, this.blockchain, this.nodeId);

        this.server = this.createHttpServer(this.app);
    }

    private mountAppMiddleware (app: Application) {
        middleware(app);
    }

    private mountAppRoutes (
        app: Application,
        blockchain: Blockchain,
        nodeId: string,
    ) {
        routes(app, blockchain, nodeId);
    }

    private createHttpServer (app: Application) {
        return http.createServer(app);
    }

    public listen (port: string) {
        this.server.listen(
            port,
            () => console.log(`Listening on port ${port}`)
        );
    }
}

export default Server;
