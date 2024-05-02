"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpRequest = void 0;
class TcpRequest {
    constructor(msg, raw) {
        this.msg = msg;
        this.raw = raw;
        this.sender = msg.header.getField(1).length === 1 ? msg.header.getField(1).toString() : msg.header.getField(1);
        this.facility = msg.header.getField(2).length === 1 ? msg.header.getField(2).toString() : msg.header.getField(2);
        this.type = msg.header.getComponent(7, 1).toString();
        this.event = msg.header.getComponent(7, 2).toString();
    }
}
exports.TcpRequest = TcpRequest;
