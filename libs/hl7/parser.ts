import { Hl7Component } from "./component";
import { Delimiters } from "./delimiters";
import { Hl7Field } from "./field";
import { Hl7Header } from "./header";
import { Hl7Message } from "./message";
import { Hl7Segment } from "./segment";

export type Hl7ParserOptions = {
    segmentSeparator?: string;
};

export class Hl7Parser {
    message: Hl7Message | undefined;
    delimiters: Delimiters;
    constructor(opts?: Hl7ParserOptions) {
        this.message = undefined;
        this.delimiters = {
            fieldSeparator: "|",
            componentSeparator: "^",
            subComponentSeparator: "&",
            escapeCharacter: "\\",
            repetitionCharacter: "~",
            segmentSeparator: opts?.segmentSeparator || "\r"
        };
    }

    parse(str: string) {
        this.message = new Hl7Message();
        let segments = str.split(this.delimiters.segmentSeparator);

        for (let i = 0; i < segments.length; i++) {
            if (i === 0) {
                this.message.header = this.parseHeader(segments[i]);
            } else {
                if (segments[i].trim()) {
                    this.message.segments.push(this.parseSegment(segments[i]));
                }
            }
        }

        return this.message;
    }

    parseHeader(str: string) {
        let header = new Hl7Header();
        let fields = str.split(this.delimiters.fieldSeparator);

        for (let i = 2; i < fields.length; i++) {
            header.fields.push(this.parseField(fields[i]));
        }

        return header;
    }

    parseSegment(str: string) {
        let segment = new Hl7Segment();
        let fields = str.split(this.delimiters.fieldSeparator);
        segment.name = fields[0];
        for (let i = 1; i < fields.length; i++) {
            segment.fields.push(this.parseField(fields[i]));
        }

        return segment;
    }

    parseField(str: string) {
        let field = new Hl7Field();

        let components = str.split(this.delimiters.componentSeparator);
        let cs = [];
        for (let i = 0; i < components.length; i++) {
            cs.push(this.parseComponent(components[i]));
        }
        field.value.push(cs);

        return field;
    }

    parseComponent(str: string) {
        let component = new Hl7Component();
        if (str.indexOf(this.delimiters.repetitionCharacter) >= 0) {
            let cs = str.split(this.delimiters.repetitionCharacter);
            for (let i = 0; i < cs.length; i++) {
                component.value.push(cs[i]);
            }
        } else {
            if (str.indexOf(this.delimiters.subComponentSeparator) >= 0) {
                let subComponents = str.split(
                    this.delimiters.subComponentSeparator
                );
                let subs = [];
                for (let i = 0; i < subComponents.length; i++) {
                    subs.push(subComponents[i]);
                }
                component.value.push(subs);
            } else {
                component.value.push(str);
            }
        }

        return component;
    }
}
