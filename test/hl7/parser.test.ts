import assert from "node:assert";
import { describe, it } from "node:test";
import { Hl7Parser } from "../../libs/hl7/parser";
import fs from "fs";
import { Hl7Segment } from "../../libs/hl7/segment";

describe("HL7 Parser", () => {
    describe(".parse()", () => {
        it("should parse message with different segment separators", () => {
            let parser = new Hl7Parser();
            let msg1 = "MSH|^~\\&|Header Field 1|Header Field 2\rNME|Component 1^Component 2|Field 2"
            let msg2 = "MSH|^~\\&|Header Field 1|Header Field 2\nNME|Component 1^Component 2|Field 2"
      
            let x = parser.parse(msg1);
      
            assert.equal(x.segments.length, 1);
            assert.equal(new Hl7Parser({segmentSeparator: '\n'}).parse(msg2).segments.length, 1); 
        });
        
        it("should parse message and getting correct component if there is a repetition", () => {
            // from: https://github.com/hitgeek/simple-hl7/issues/77
            let msg = "MSH|^~\\&|Header Field 1|Header Field 2\rPID|1|124553|124553^^^TEST^PI~~~||JOHN^DOE|";
            let parser = new Hl7Parser();
            let parsedMessage = parser.parse(msg);
            let text = (parsedMessage.getSegment("PID") as Hl7Segment).getComponent(3, 4);

            assert.equal(text, "TEST");
        });
    });

    describe("parse sample document. Success = output same as input", () => {
        it("should parse all the sample documents", () => {
            let parser = new Hl7Parser();
            let samples = fs.readdirSync("test/hl7/samples");
            samples = samples.filter(v => v.endsWith(".hl7"));

            samples.forEach(v => {
                let sample = fs.readFileSync(`test/hl7/samples/${v}`, "utf8");
                let text = sample.replace(/\r?\n/g, "\r").trim();
                let parsedMessage = parser.parse(text);

                assert.ok(parsedMessage.segments.length > 0);
                assert.equal(parsedMessage.toString(), text);
            });
        })
    });

    describe("Ignore Empty Lines", () => {
        it("should parse the correct number of segments", () => {
            let parser = new Hl7Parser();
            let sample = fs.readFileSync("test/hl7/samples/adt.txt");
            let adt = parser.parse(sample.toString().replace(/\r?\n/g, "\r"));
            assert.equal(adt.segments.length, 3);
        }); 
    });
})

