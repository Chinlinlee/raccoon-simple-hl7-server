import { describe, it } from "node:test";
import assert from "node:assert";
import { Hl7Message } from "../../libs/hl7/message";
import { DELIMITERS } from "../../libs/hl7/delimiters";

describe("HL7 Message", () => {
    describe(".toString()", () => {
        it("should print out structured hl7 message properly", () => {
            let emptyMessageWithHeaders = new Hl7Message("Header 1", "Header 2");

            assert(emptyMessageWithHeaders.toString(), "MSH|^~\\&|Header 1|Header 2");
        });
    });

    describe(".addSegment()", () => {
        it("should add segment with different syntaxes, check with toString()", () => {
            let emptyMessageWithHeaders = new Hl7Message("Header 1", "Header 2");
            emptyMessageWithHeaders.addSegment("NME", "Field 1", "Field 2");
            assert.equal(emptyMessageWithHeaders.toString(), "MSH|^~\\&|Header 1|Header 2\rNME|Field 1|Field 2");

            emptyMessageWithHeaders.addSegment("NME", "Field 1", ["Component 1", "Component 2"]);
            assert.equal(emptyMessageWithHeaders.toString(), "MSH|^~\\&|Header 1|Header 2\rNME|Field 1|Field 2\rNME|Field 1|Component 1^Component 2");
        });
    });

    describe(".getSegments()", () => {
        it("should return an array of segments, and if no segments found, should return an empty array", () => {
            let messageWithRepeatingSegments = new Hl7Message("Header 1", "Header 2");
            messageWithRepeatingSegments.addSegment("NME", "Field 1", "Field 2");
            messageWithRepeatingSegments.addSegment("NME", "Field 3", "Field 4");

            let nmeSegments = messageWithRepeatingSegments.getSegments("NME");
            assert.equal(nmeSegments.length, 2);
            assert.equal(nmeSegments[0].toString(DELIMITERS), "NME|Field 1|Field 2");
            assert.equal(nmeSegments[1].toString(DELIMITERS), "NME|Field 3|Field 4");

            let pidSegments = messageWithRepeatingSegments.getSegments("PID");
            assert.equal(pidSegments.length, 0);
        });
    });
});