import { Delimiters } from "./delimiters";
import { Hl7Field } from "./field";
export declare class Hl7Header {
    #private;
    readonly name: string;
    delimiters: Delimiters;
    fields: (Hl7Field | Hl7Field[])[];
    constructor(...args: (string | string[] | (string | string[])[])[]);
    addField(fieldValue: string | string[], position?: number): void;
    setField(index: number, fieldValue: string | string[]): void;
    removeField(index: number): void;
    getField(index: number, repeatIndex?: number): string;
    getComponent(fieldIndex: number, componentIndex: number, subComponentIndex?: number): string;
    toString(): string;
}
//# sourceMappingURL=header.d.ts.map