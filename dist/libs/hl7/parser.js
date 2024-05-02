"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Parser = void 0;
const component_1 = require("./component");
const field_1 = require("./field");
const header_1 = require("./header");
const message_1 = require("./message");
const segment_1 = require("./segment");
class Hl7Parser {
    constructor(opts) {
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
    parse(str) {
        this.message = new message_1.Hl7Message();
        let segments = str.split(this.delimiters.segmentSeparator);
        for (let i = 0; i < segments.length; i++) {
            if (i === 0) {
                this.message.header = this.parseHeader(segments[i]);
            }
            else {
                if (segments[i].trim()) {
                    this.message.segments.push(this.parseSegment(segments[i]));
                }
            }
        }
        return this.message;
    }
    parseHeader(str) {
        let header = new header_1.Hl7Header();
        let fields = str.split(this.delimiters.fieldSeparator);
        for (let i = 2; i < fields.length; i++) {
            header.fields.push(this.parseField(fields[i]));
        }
        return header;
    }
    parseSegment(str) {
        let segment = new segment_1.Hl7Segment();
        let fields = str.split(this.delimiters.fieldSeparator);
        segment.name = fields[0];
        for (let i = 1; i < fields.length; i++) {
            segment.fields.push(this.parseField(fields[i]));
        }
        return segment;
    }
    parseField(str) {
        let field = new field_1.Hl7Field();
        let components = str.split(this.delimiters.componentSeparator);
        let cs = [];
        for (let i = 0; i < components.length; i++) {
            cs.push(this.parseComponent(components[i]));
        }
        field.value.push(cs);
        return field;
    }
    parseComponent(str) {
        let component = new component_1.Hl7Component();
        if (str.indexOf(this.delimiters.repetitionCharacter) >= 0) {
            let cs = str.split(this.delimiters.repetitionCharacter);
            for (let i = 0; i < cs.length; i++) {
                component.value.push(cs[i]);
            }
        }
        else {
            if (str.indexOf(this.delimiters.subComponentSeparator) >= 0) {
                let subComponents = str.split(this.delimiters.subComponentSeparator);
                let subs = [];
                for (let i = 0; i < subComponents.length; i++) {
                    subs.push(subComponents[i]);
                }
                component.value.push(subs);
            }
            else {
                component.value.push(str);
            }
        }
        return component;
    }
}
exports.Hl7Parser = Hl7Parser;
