import { Hl7Component } from "./component";
import { Delimiters } from "./delimiters";
export declare class Hl7Field {
    #private;
    value: (Hl7Component | Hl7Component[])[];
    constructor(...args: (string | string[])[] | ((string | string[])[])[]);
    toString(delimiters: Delimiters): string;
}
//# sourceMappingURL=field.d.ts.map