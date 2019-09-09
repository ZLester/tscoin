import Node from './Node';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export default (node: Node) => {
    node.app.use(morgan('combined'));
    node.app.use(bodyParser.json());
    node.app.use(bodyParser.urlencoded({ extended: true }));    
};
