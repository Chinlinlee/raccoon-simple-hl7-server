import { EventEmitter } from "events";
import { ErrorMiddlewareHandle, MiddlewareHandle, Proto } from "./proto";
import { Server } from "../../apps";
import { Hl7TcpServer, Hl7TcpServerOptions } from "../../apps/tcp-server";

interface Hl7Server {
    start: (port: number, encoding?: BufferEncoding, options?: any) => void;
    stop: () => void;
}

export class Tcp extends EventEmitter implements Hl7Server {
    private proto: Proto;
    server: Hl7TcpServer | null;
    options: Hl7TcpServerOptions;
    constructor(options?: Hl7TcpServerOptions) {
        super();
        this.proto = new Proto();
        this.server = null;
        this.options = {
            ...options,
            handler: (err, req, res, next) => {
                this.proto._handle(req!, res!);
            },
        };
    }

    start(port: number, encoding?: BufferEncoding, options?: any) {
        this.server = Server.createTcpServer(this.options);

        this.server.start.apply(this.server, [port, encoding, options]);
        return this.server;
    }

    stop() {
        this.server?.stop();
    }

    use(fn: ErrorMiddlewareHandle | MiddlewareHandle) {
        if (fn.length === 3) {
            this.proto.use(fn as MiddlewareHandle);
        } else if (fn.length === 4) {
            this.proto.use(fn as ErrorMiddlewareHandle);
        }
    }
}