import { Delimiters } from "./delimiters";
import { Hl7Field } from "./field";
import { Hl7Segment } from "./segment";

export class Hl7Header {
    readonly name: string;
    delimiters: Delimiters;
    fields: (Hl7Field | Hl7Field[])[];

    constructor(...args: (string | string[] | (string | string[])[])[]) {
        this.name = "MSH";
        this.delimiters = {
            fieldSeparator: "|",
            componentSeparator: "^",
            subComponentSeparator: "&",
            escapeCharacter: "\\",
            repetitionCharacter: "~",
            segmentSeparator: "\r"
        };
        this.fields = [];

        this.#init(args);
    }

    #init(args: (string | string[] | (string | string[])[])[]) {
        console.log("header init");
        if (args.length > 0) {
            for(let i = 0 ; i < args.length ; i++) {
                if (Array.isArray(args[i])) {
                    this.fields.push(new Hl7Field([...args[i]]));
                } else {
                    this.fields.push(new Hl7Field(args[i] as string));
                }
            }
        }
    }

    addField(fieldValue: string | string[], position?: number) {
        return Hl7Segment.prototype.addField.call(this, fieldValue, position);
    }

    setField(index: number, fieldValue: string | string[]) {
        return Hl7Segment.prototype.setField.call(this, index, fieldValue);
    }

    removeField(index: number) {
        return Hl7Segment.prototype.removeField.call(this, index);
    }

    getField(index: number, repeatIndex?: number) {
        return Hl7Segment.prototype.getField.call(this, index, repeatIndex);
    }

    getComponent(fieldIndex: number, componentIndex: number, subComponentIndex?: number) {
        return Hl7Segment.prototype.getComponent.call(this, fieldIndex, componentIndex, subComponentIndex);
    }

    toString() {
        let returnString = this.name +
                           this.delimiters.fieldSeparator +
                           this.delimiters.componentSeparator +
                           this.delimiters.repetitionCharacter +
                           this.delimiters.escapeCharacter +
                           this.delimiters.subComponentSeparator +
                           this.delimiters.fieldSeparator;

        for(let i = 0 ; i < this.fields.length ; i++) {
            returnString += this.fields[i].toString(this.delimiters);

            if (i !== this.fields.length - 1) {
                returnString += this.delimiters.fieldSeparator;
            }
        }

        return returnString;
    }
}