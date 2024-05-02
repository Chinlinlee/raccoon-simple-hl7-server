import { Hl7Header } from "./header";
import { Hl7Segment } from "./segment";
export declare class Hl7Message {
    header: Hl7Header;
    segments: Hl7Segment[];
    constructor(...args: (string | string[])[]);
    getSegment(name: string): "" | Hl7Segment;
    getSegments(name: string): Hl7Segment[];
    addSegment(...args: (string | string[])[]): Hl7Segment | undefined;
    log(): string;
    toString(): string;
}
//# sourceMappingURL=message.d.ts.map