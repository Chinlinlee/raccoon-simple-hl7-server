/// <reference types="node" />
import { Socket } from "net";
import { Hl7Message } from "../hl7/message";
import { Hl7Response } from "./response";
export declare class TcpResponse implements Hl7Response {
    ack: Hl7Message;
    socket?: Socket | undefined;
    constructor(socket: Socket, ack: Hl7Message);
    end(): void;
}
//# sourceMappingURL=tcpResponse.d.ts.map