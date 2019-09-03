import Blockchain from './Blockchain/';
import Server from './Server';
import conf from './conf';

const zetacoin = new Blockchain(
    1337,
    'thevoid',
    'dixitquedeusfiatzetaetfactaestzeta',
);

const server = new Server(zetacoin);

server.listen(conf.PORT);
