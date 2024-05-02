import { Hl7Field } from "./field";
import { Delimiters } from "./delimiters";
export declare class Hl7Segment {
    #private;
    name: string;
    fields: (Hl7Field | Hl7Field[])[];
    constructor(...args: (string | string[] | (string | string[])[])[]);
    addField(fieldValue: string | string[] | Hl7Field, position?: number): void;
    setField(index: number, fieldValue: string | string[]): void;
    removeField(index: number): void;
    getField(index: number, repeatIndex?: number): string;
    getComponent(fieldIndex: number, componentIndex: number, subComponentIndex?: number): string;
    setComponent(fieldIndex: number, componentIndex: number, value: (string | string[])): void;
    toString(delimiters: Delimiters): string;
}
//# sourceMappingURL=segment.d.ts.map