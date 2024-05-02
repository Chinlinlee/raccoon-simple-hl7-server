import { Hl7Component } from "./component";
import { Delimiters } from "./delimiters";
import { Hl7Field } from "./field";
import { Hl7Header } from "./header";
import { Hl7Message } from "./message";
import { Hl7Segment } from "./segment";
export type Hl7ParserOptions = {
    segmentSeparator?: string;
};
export declare class Hl7Parser {
    message: Hl7Message | undefined;
    delimiters: Delimiters;
    constructor(opts?: Hl7ParserOptions);
    parse(str: string): Hl7Message;
    parseHeader(str: string): Hl7Header;
    parseSegment(str: string): Hl7Segment;
    parseField(str: string): Hl7Field;
    parseComponent(str: string): Hl7Component;
}
//# sourceMappingURL=parser.d.ts.map