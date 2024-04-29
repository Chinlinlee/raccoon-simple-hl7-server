import { describe, it } from "node:test";
import assert from "node:assert";
import { Hl7Segment } from "../../libs/hl7/segment";
import { DELIMITERS } from "../../libs/hl7/delimiters";
import { Hl7Field } from "../../libs/hl7/field";

describe("HL7 Segment", () => {
    describe(".toString", () => {
        it("should return hl7 with proper structure for single segment", () => {
            let segmentWithSingleValueFields = new Hl7Segment(
                "NME",
                "Field 1",
                "Field 2",
                "Field 3"
            );
            assert.equal(
                segmentWithSingleValueFields.toString(DELIMITERS),
                "NME|Field 1|Field 2|Field 3"
            );
        });

        it("should return hl7 with proper structure for segment with component value fields", () => {
            let segmentWithComponentValueFields = new Hl7Segment(
                "NME",
                ["Component 1", "Component 2"],
                "Field 3"
            );

            assert.equal(
                segmentWithComponentValueFields.toString(DELIMITERS),
                "NME|Component 1^Component 2|Field 3"
            );
        });
    });

    describe(".addField()", () => {
        it("should add a filed, check using .toString()", () => {
            let segmentWithNoField = new Hl7Segment("NME");
            segmentWithNoField.addField("Field Value");
            assert.equal(
                segmentWithNoField.toString(DELIMITERS),
                "NME|Field Value"
            );

            segmentWithNoField.addField(["Component 1", "Component 2"]);
            assert.equal(
                segmentWithNoField.toString(DELIMITERS),
                "NME|Field Value|Component 1^Component 2"
            );

            segmentWithNoField.addField("Field Value 2");
            assert.equal(
                segmentWithNoField.toString(DELIMITERS),
                "NME|Field Value|Component 1^Component 2|Field Value 2"
            );
        });
    });

    describe(".setField()", () => {
        it("should swap a field at certain index, check using .toString()", () => {
            let simpleSegment = new Hl7Segment(
                "NME",
                "Field 1",
                "Field 2",
                "Field 3"
            );
            assert.equal(
                simpleSegment.toString(DELIMITERS),
                "NME|Field 1|Field 2|Field 3"
            );

            simpleSegment.setField(2, ["Component 1", "Component 2"]);
            assert.equal(
                simpleSegment.toString(DELIMITERS),
                "NME|Field 1|Component 1^Component 2|Field 3"
            );
        });
    });

    describe(".removeField()", () => {
        it("should remove a field, check using .toString()", () => {
            let simpleSegment = new Hl7Segment(
                "NME",
                "Field 1",
                "Field 2",
                "Field 3"
            );
            assert.equal(
                simpleSegment.toString(DELIMITERS),
                "NME|Field 1|Field 2|Field 3"
            );

            simpleSegment.removeField(2);
            assert.equal(
                simpleSegment.toString(DELIMITERS),
                "NME|Field 1|Field 3"
            );
        });
    });

    describe(".getField(x)", () => {
        it("should return a field at certain index, check using .toString()", () => {
            let simpleSegment = new Hl7Segment("NME", "Field 1", "Field 2", [
                "Component 1",
                "Component 2"
            ]);
            assert.equal(
                simpleSegment.toString(DELIMITERS),
                "NME|Field 1|Field 2|Component 1^Component 2"
            );

            assert.equal(simpleSegment.getField(2), "Field 2");
            assert.equal(simpleSegment.getField(3), "Component 1^Component 2");
            assert.equal(simpleSegment.getField(7), "");
        });
    });

    describe(".getField(x, z)", () => {
        it("should return a field at certain index, check using .toString()", () => {
            var simpleSegment = new Hl7Segment("NME");
            simpleSegment.fields.push(new Hl7Field("One", "Two"));

            assert.equal(simpleSegment.getField(1, 1), "One");
            assert.equal(simpleSegment.getField(1, 2), "Two");
        });
    });

    describe(".getComponent(x)", () => {
        it("should return the component at certain index", () => {
            let simpleSegment = new Hl7Segment("NME", "Field 1", "Field 2", [
                "Component 1",
                "Component 2"
            ]);

            assert.equal(simpleSegment.getComponent(3, 1), "Component 1");
            assert.equal(simpleSegment.getComponent(3, 2), "Component 2");
            assert.equal(simpleSegment.getComponent(3, 3), "");
            assert.equal(simpleSegment.getComponent(2, 1), "");
        });
    });

    describe(".getComponent(x, z)", () => {
        it("should return the component at certain index", () => {
            let simpleSegment = new Hl7Segment("NME", [
                "Component 1",
                ["Sub1", "Sub2"]
            ]);

            assert.equal(simpleSegment.getComponent(1, 2, 1), "Sub1");
            assert.equal(simpleSegment.getComponent(1, 2, 2), "Sub2");
            assert.equal(simpleSegment.getComponent(1, 2, 3), "");
        });
    });

    describe(".setComponent(x, v)", () => {
        it("should return the component at index", function () {
            let simpleSegment = new Hl7Segment("NME", "Field 1", "Field 2", [
                "Component 1",
                "Component 2",
                ["Sub1", "Sub2"]
            ]);
            assert.equal(simpleSegment.getComponent(3, 1), "Component 1");

            simpleSegment.setComponent(3, 1, "Component 1 Update");
            assert.equal(
                simpleSegment.getComponent(3, 1),
                "Component 1 Update"
            );
            
            simpleSegment.setComponent(3, 3, ["Sub1 Update", "Sub2 Update"]);
            assert.equal(
                simpleSegment.getComponent(3, 3),
                "Sub1 Update&Sub2 Update"
            );
        });
    });
});
