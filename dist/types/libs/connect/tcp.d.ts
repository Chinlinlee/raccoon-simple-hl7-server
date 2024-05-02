/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "events";
import { ErrorMiddlewareHandle, MiddlewareHandle } from "./proto";
import { Hl7TcpServer, Hl7TcpServerOptions } from "../../apps/tcp-server";
interface Hl7Server {
    start: (port: number, encoding?: BufferEncoding, options?: any) => void;
    stop: () => void;
}
export declare class Tcp extends EventEmitter implements Hl7Server {
    private proto;
    server: Hl7TcpServer | null;
    options: Hl7TcpServerOptions;
    constructor(options?: Hl7TcpServerOptions);
    start(port: number, encoding?: BufferEncoding, options?: any): Hl7TcpServer;
    stop(): void;
    use(fn: ErrorMiddlewareHandle | MiddlewareHandle): void;
}
export {};
//# sourceMappingURL=tcp.d.ts.map