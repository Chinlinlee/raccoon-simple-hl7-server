import { Hl7Message } from "../hl7/message";

export interface Hl7Request {
    msg: Hl7Message;
    sender: string;
    facility: string;
    type: string;
    event: string;
}

export interface TcpRequest extends Request {
    raw: string;
}