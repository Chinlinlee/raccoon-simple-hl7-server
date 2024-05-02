"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpResponse = void 0;
const VT = String.fromCharCode(0x0b);
const FS = String.fromCharCode(0x1c);
const CR = String.fromCharCode(0x0d);
class TcpResponse {
    constructor(socket, ack) {
        this.socket = socket;
        this.ack = ack;
    }
    end() {
        this.socket?.write(VT + (this.ack).toString() + FS + CR);
    }
}
exports.TcpResponse = TcpResponse;
