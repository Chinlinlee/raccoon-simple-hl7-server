import { Hl7Message } from "../hl7/message";
import { Hl7Request } from "./request";
export declare class TcpRequest implements Hl7Request {
    msg: Hl7Message;
    raw: string;
    sender: string;
    facility: string;
    type: string;
    event: string;
    constructor(msg: Hl7Message, raw: string);
}
