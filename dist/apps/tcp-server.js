"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7TcpServer = void 0;
const events_1 = require("events");
const message_1 = require("../libs/hl7/message");
const dayjs_1 = __importDefault(require("dayjs"));
const net_1 = __importDefault(require("net"));
const parser_1 = require("../libs/hl7/parser");
const tcpRequest_1 = require("../libs/connect/tcpRequest");
const tcpResponse_1 = require("../libs/connect/tcpResponse");
const VT = String.fromCharCode(0x0b);
const FS = String.fromCharCode(0x1c);
const CR = String.fromCharCode(0x0d);
class Hl7TcpServer extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.handler = options.handler;
        this.server = null;
        this.socket = null;
        this.parser = options.parser || new parser_1.Hl7Parser();
    }
    start(port, encoding, options) {
        this.server = net_1.default.createServer((socket) => {
            let message = "";
            socket.on("data", (data) => {
                try {
                    message += data.toString();
                    if (message.substring(message.length - 2, message.length) == FS + CR) {
                        let parsedMessage = this.parser.parse(message.substring(0, message.length - 2));
                        let ack = this.createAckMessage(parsedMessage);
                        let req = new tcpRequest_1.TcpRequest(parsedMessage, message);
                        let res = new tcpResponse_1.TcpResponse(socket, ack);
                        this.handler(null, req, res, () => { });
                        message = "";
                    }
                }
                catch (e) {
                    /** @ts-ignore */
                    this.handler(e);
                }
            }).setEncoding(encoding ? encoding : "utf8");
            socket.on("error", (err) => {
                message = "";
                /** @ts-ignore */
                this.handler(err);
            });
        });
        this.server.listen(port);
    }
    stop() {
        this.server?.close();
    }
    createAckMessage(msg) {
        let ack = new message_1.Hl7Message(msg.header.getField(3), msg.header.getField(4), msg.header.getField(1), msg.header.getField(2), (0, dayjs_1.default)().format("YYYYMMDDHHmmss"), '', ["ACK"], `ACK${(0, dayjs_1.default)().format("YYYYMMDDHHmmss")}`, "P", '2.3');
        ack.addSegment("MSA", "AA", msg.header.getField(8));
        return ack;
    }
}
exports.Hl7TcpServer = Hl7TcpServer;
