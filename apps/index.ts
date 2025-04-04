import { Hl7TcpServer, type Hl7TcpServerOptions } from "./tcp-server";

export const Server = {
    createTcpServer: (options: Hl7TcpServerOptions) => new Hl7TcpServer(options)
};

export { Tcp } from "../libs/connect/tcp";
export { Hl7Component } from "../libs/hl7/component";
export { Hl7Field } from "../libs/hl7/field";
export { Hl7Header } from "../libs/hl7/header";
export { Hl7Message } from "../libs/hl7/message";
export { Hl7Parser } from "../libs/hl7/parser";
export { Hl7Segment } from "../libs/hl7/segment";