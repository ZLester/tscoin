interface LoggerI {
    debug: (msg: string) => void;
    error: (msg: string) => void;
    log: (msg: string) => void;
}

// TODO
class Logger implements LoggerI {
    debug (msg: string) {
        console.log(msg);
    }
    log (msg: string) {
        console.log(msg);
    }
    error (msg: string) {
        console.error(msg);
    }
}

export default Logger;
