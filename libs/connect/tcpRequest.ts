import { Hl7Message } from "../hl7/message";
import { Hl7Request } from "./request";

export class TcpRequest implements Hl7Request {
    msg: Hl7Message;
    raw: string;
    sender: string;
    facility: string;
    type: string;
    event: string;
    constructor(msg: Hl7Message, raw: string) {
        this.msg = msg;
        this.raw = raw;
        this.sender = msg.header.getField(1).length === 1 ? msg.header.getField(1).toString() : msg.header.getField(1);
        this.facility = msg.header.getField(2).length === 1 ? msg.header.getField(2).toString() : msg.header.getField(2);

        this.type = msg.header.getComponent(7 , 1).toString();
        this.event = msg.header.getComponent(7, 2).toString();
    }

}