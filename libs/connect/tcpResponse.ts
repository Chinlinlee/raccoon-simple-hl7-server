import { Socket } from "net";
import { Hl7Message } from "../hl7/message";
import { Hl7Response } from "./response";

const VT = String.fromCharCode(0x0b);
const FS = String.fromCharCode(0x1c);
const CR = String.fromCharCode(0x0d);

export class TcpResponse implements Hl7Response {
    ack: Hl7Message;
    socket?: Socket | undefined;
    constructor(socket: Socket, ack: Hl7Message) {
        this.socket = socket;
        this.ack = ack;
    }

    end() {
        this.socket?.write(VT + (this.ack).toString() + FS + CR);
    }
}