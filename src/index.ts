import Blockchain from './Blockchain/';
import Node from './Node';
import conf from './conf';

const zetacoin = new Blockchain(
    1337,
    'thevoid',
    'dixitquedeusfiatzetaetfactaestzeta',
);

const node = new Node(zetacoin, conf.URL);

node.listen(conf.PORT);
