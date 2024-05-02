"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Message = void 0;
const header_1 = require("./header");
const segment_1 = require("./segment");
class Hl7Message {
    constructor(...args) {
        this.header = new header_1.Hl7Header();
        this.segments = [];
        if (args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                this.header.addField(args[i]);
            }
        }
    }
    getSegment(name) {
        let hitSegment = this.segments.find(v => v.name === name);
        return hitSegment || "";
    }
    getSegments(name) {
        return this.segments.filter(v => v.name === name);
    }
    addSegment(...args) {
        if (args.length === 1) {
            let segment = new segment_1.Hl7Segment(args[0]);
            this.segments.push(segment);
            return segment;
        }
        if (args.length > 1) {
            let segment = new segment_1.Hl7Segment(args[0]);
            for (let i = 1; i < args.length; i++) {
                segment.addField(args[i]);
            }
            this.segments.push(segment);
            return segment;
        }
    }
    log() {
        let curSeparator = this.header.delimiters.segmentSeparator;
        this.header.delimiters.segmentSeparator = "\n";
        let returnString = this.toString();
        this.header.delimiters.segmentSeparator = curSeparator;
        return returnString;
    }
    toString() {
        let returnString = this.header.toString() + this.header.delimiters.segmentSeparator;
        for (let i = 0; i < this.segments.length; i++) {
            returnString += this.segments[i].toString(this.header.delimiters);
            if (i !== this.segments.length - 1) {
                returnString += this.header.delimiters.segmentSeparator;
            }
        }
        return returnString.replace(/^\s+|\s+$/g, '');
    }
}
exports.Hl7Message = Hl7Message;
