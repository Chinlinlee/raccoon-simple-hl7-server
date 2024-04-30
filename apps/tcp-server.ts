import { EventEmitter } from "events";
import { Hl7Message } from "../libs/hl7/message";
import dayjs from "dayjs";
import net from "net";
import { Hl7Parser } from "../libs/hl7/parser";
import { TcpRequest } from "../libs/connect/tcpRequest";
import { TcpResponse } from "../libs/connect/tcpResponse";
import { ErrorMiddlewareHandle, MiddlewareHandle } from "../libs/connect/proto";

const VT = String.fromCharCode(0x0b);
const FS = String.fromCharCode(0x1c);
const CR = String.fromCharCode(0x0d);

export type Hl7TcpServerOptions = {
    handler: ErrorMiddlewareHandle;
    parser?: Hl7Parser;
};

export class Hl7TcpServer extends EventEmitter {
    handler: Hl7TcpServerOptions["handler"];
    server: net.Server | null;
    socket: net.Socket | null;
    parser: Hl7Parser;
    constructor(options: Hl7TcpServerOptions) {
        super();

        this.handler = options.handler;
        this.server = null;
        this.socket = null;

        this.parser = options.parser || new Hl7Parser();
    }

    start(port: number, encoding?: BufferEncoding, options?: any) {
        this.server = net.createServer((socket) => {
            let message = "";
            
            socket.on("data", (data) => {
                try {
                    message += data.toString();

                    if (message.substring(message.length - 2, message.length) == FS + CR) {
                        let parsedMessage = this.parser.parse(message.substring(0, message.length - 2));
                        let ack = this.createAckMessage(parsedMessage);
    
                        let req = new TcpRequest(parsedMessage, message);
                        let res = new TcpResponse(socket, ack);
                        this.handler(null, req, res, () => {});
                        message = "";
                    }
                } catch(e) {
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

    createAckMessage(msg: Hl7Message) {
        let ack = new Hl7Message(
            msg.header.getField(3),
            msg.header.getField(4),
            msg.header.getField(1),
            msg.header.getField(2),
            dayjs().format("YYYYMMDDHHmmss"),
            '',
            ["ACK"],
            `ACK${dayjs().format("YYYYMMDDHHmmss")}`,
            "P",
            '2.3'
        );

        ack.addSegment("MSA", "AA", msg.header.getField(8));

        return ack;
    }
}