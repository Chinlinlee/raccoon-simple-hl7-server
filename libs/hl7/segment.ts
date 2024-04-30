import { Hl7Component } from "./component";
import { Hl7Field } from "./field";
import { DELIMITERS, Delimiters } from "./delimiters";

export class Hl7Segment {
    name: string;
    fields: (Hl7Field | Hl7Field[])[];
    constructor(...args: (string | string[] | (string | string[])[])[]) {
        this.name = "";
        this.fields = [];

        this.#init(args);
    }

    #init(args: (string | string[] | (string | string[])[])[]) {
        if (args.length >= 1) {
            this.name = args[0] as string;
        }

        if (args.length >= 2) {
            for (let i = 1; i < args.length; i++) {
                let arg = args[i];
                if (Array.isArray(arg)) {
                    this.fields.push(new Hl7Field([...args[i]]));
                } else {
                    this.fields.push(new Hl7Field(args[i] as string));
                }
            }
        }
    }

    addField(fieldValue: string | string[] | Hl7Field, position?: number) {
        if (position) {
            if (this.fields.length > position - 1) {
                this.setField(position, fieldValue as string | string[]);
            } else {
                let curLength = this.fields.length;
                while (curLength <= position - 2) {
                    this.addField("");
                    curLength = this.fields.length;
                }
                this.addField(fieldValue);
            }
        } else {
            if (typeof fieldValue == "object") {
                if (Array.isArray(fieldValue)) {
                    this.fields.push(new Hl7Field(fieldValue));
                } else {
                    this.fields.push(fieldValue as Hl7Field);
                }
            } else {
                this.fields.push(new Hl7Field(fieldValue));
            }
        }
    }

    setField(index: number, fieldValue: string | string[]) {
        if (this.fields.length >= index) {
            this.fields[index - 1] = new Hl7Field(fieldValue);
        }
    }

    removeField(index: number) {
        if (this.fields.length >= index) {
            this.fields.splice(index - 1, 1);
        }
    }

    getField(index: number, repeatIndex?: number) {
        if (this.fields.length >= index) {
            let field = this.fields[index - 1] as Hl7Field;
            if (repeatIndex) {
                if (field.value.length >= repeatIndex) {
                    return field.value[repeatIndex - 1].toString(DELIMITERS);
                }
                return "";
            }
            return field.toString(DELIMITERS);
        }
        return "";
    }

    getComponent(
        fieldIndex: number,
        componentIndex: number,
        subComponentIndex?: number
    ) {
        if (this.fields.length >= fieldIndex) {
            let field = this.fields[fieldIndex - 1] as Hl7Field;
            let components = (field.value[0]) as Hl7Component[];
            
            if (components.length >= componentIndex) {
                let component = components[componentIndex - 1];
                if (subComponentIndex) {
                    if (component.value[0].length >= subComponentIndex) {
                        return component.value[0][
                            subComponentIndex - 1
                        ].toString();
                    }
                    return "";
                }
                return component.toString(DELIMITERS);
            }
            return "";
        }
        return "";
    }

    setComponent(fieldIndex: number, componentIndex: number, value: (string | string[])) {
        if (this.fields.length >= fieldIndex) {
            let field = this.fields[fieldIndex - 1] as Hl7Field;
            let components = (field.value[0]) as Hl7Component[];
            if (components.length >= componentIndex) {
                components[componentIndex - 1] = new Hl7Component(value);
            }
        }
    }

    toString(delimiters: Delimiters) {
        let returnString = this.name + delimiters.fieldSeparator;

        for (let i = 0; i < this.fields.length; i++) {
            returnString += this.fields[i].toString(delimiters);
            if (i != this.fields.length - 1) {
                returnString += delimiters.fieldSeparator;
            }
        }

        return returnString;
    }
}
