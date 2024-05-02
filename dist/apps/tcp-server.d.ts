/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "events";
import { Hl7Message } from "../libs/hl7/message";
import net from "net";
import { Hl7Parser } from "../libs/hl7/parser";
import { ErrorMiddlewareHandle } from "../libs/connect/proto";
export type Hl7TcpServerOptions = {
    handler: ErrorMiddlewareHandle;
    parser?: Hl7Parser;
};
export declare class Hl7TcpServer extends EventEmitter {
    handler: Hl7TcpServerOptions["handler"];
    server: net.Server | null;
    socket: net.Socket | null;
    parser: Hl7Parser;
    constructor(options: Hl7TcpServerOptions);
    start(port: number, encoding?: BufferEncoding, options?: any): void;
    stop(): void;
    createAckMessage(msg: Hl7Message): Hl7Message;
}
