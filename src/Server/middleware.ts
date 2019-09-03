import { Application } from 'express';
import bodyParser from 'body-parser';

export default (app: Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));    
};
