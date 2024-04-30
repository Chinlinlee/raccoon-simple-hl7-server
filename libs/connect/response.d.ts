import net from "node:net";
import { Hl7Message } from "../hl7/message";

export interface Hl7Response {
    ack?: Hl7Message;
    socket?: net.Socket;
    end: () => void;
}