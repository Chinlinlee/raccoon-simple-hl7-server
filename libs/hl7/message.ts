import { Hl7Header } from "./header";
import { Hl7Segment } from "./segment";

export class Hl7Message {
    header: Hl7Header;
    segments: Hl7Segment[];
    constructor(...args: string[]) {
        this.header = new Hl7Header();
        this.segments = [];

        if (args.length > 0) {
            for(let i = 0 ; i < args.length ; i++) {
                this.header.addField(args[i]);
            }
        }
    }

    getSegment(name: string) {
        let hitSegment = this.segments.find(v => v.name === name);
        return hitSegment || "";
    }

    getSegments(name: string) {
        return this.segments.filter(v => v.name === name);
    }

    addSegment(...args: (string | string[])[]) {
        if (args.length === 1) {
            let segment = new Hl7Segment(args[0]);
            this.segments.push(segment);
            return segment;
        }

        if (args.length > 1) {
            let segment = new Hl7Segment(args[0]);
            for(let i = 1 ; i < args.length ; i++) {
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

        for(let i = 0 ; i < this.segments.length ; i++) {
            returnString += this.segments[i].toString(this.header.delimiters);
            if (i !== this.segments.length - 1) {
                returnString += this.header.delimiters.segmentSeparator;
            }
        }

        return returnString.replace(/^\s+|\s+$/g, '');
    }
}