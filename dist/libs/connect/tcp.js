"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tcp = void 0;
const events_1 = require("events");
const proto_1 = require("./proto");
const apps_1 = require("../../apps");
class Tcp extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.proto = new proto_1.Proto();
        this.server = null;
        this.options = {
            ...options,
            handler: (err, req, res, next) => {
                this.proto._handle(req, res);
            },
        };
    }
    start(port, encoding, options) {
        this.server = apps_1.Server.createTcpServer(this.options);
        this.server.start.apply(this.server, [port, encoding, options]);
        return this.server;
    }
    stop() {
        this.server?.stop();
    }
    use(fn) {
        if (fn.length === 3) {
            this.proto.use(fn);
        }
        else if (fn.length === 4) {
            this.proto.use(fn);
        }
    }
}
exports.Tcp = Tcp;
