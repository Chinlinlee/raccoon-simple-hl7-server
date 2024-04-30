import { describe, it } from "node:test";
import assert from "node:assert";
import { Hl7Header } from "../../libs/hl7/header";
import { DELIMITERS } from "../../libs/hl7/delimiters";

describe("Header", () => {
    describe(".toString()", () => {
        it("should same as segment, but with delimiters info in first component", () => {
            let defaultHeader = new Hl7Header();

            assert.equal(defaultHeader.toString(), "MSH|^~\\&|");
        });

        it("should return hl7 with proper structure for fields and component in field", () => {
            let headerWithFieldsAndComponents = new Hl7Header(
                "Field 1",
                "Field 2",
                ["Component 1", "Component 2"],
            );

            assert.equal(headerWithFieldsAndComponents.toString(),"MSH|^~\\&|Field 1|Field 2|Component 1^Component 2");
        });
    });

    describe(".addField()", () => {
        it("should add a filed, check using .toString()", () => {
            let headerWithNoField = new Hl7Header();
            headerWithNoField.addField("Field Value");
            assert.equal(headerWithNoField.toString(), "MSH|^~\\&|Field Value");

            headerWithNoField.addField(["Component 1", "Component 2"]);
            assert.equal(headerWithNoField.toString(), "MSH|^~\\&|Field Value|Component 1^Component 2");

            headerWithNoField.addField("Field Value 2");
            assert.equal(headerWithNoField.toString(), "MSH|^~\\&|Field Value|Component 1^Component 2|Field Value 2");
        });
    });

    describe("setField()", () => {
        it("should swap a field at certain index, check using .toString()", () => {
            let simpleHeader = new Hl7Header("Field 1", "Field 2", "Field 3");
            assert.equal(simpleHeader.toString(), "MSH|^~\\&|Field 1|Field 2|Field 3");

            simpleHeader.setField(2, ["Component 1", "Component 2"]);
            assert.equal(simpleHeader.toString(), "MSH|^~\\&|Field 1|Component 1^Component 2|Field 3");
        });
    });

    describe(".removeField()", () => {
        it("should remove a field, check using .toString()", () => {
            let simpleHeader = new Hl7Header("Field 1", "Field 2", "Field 3");
            assert.equal(simpleHeader.toString(), "MSH|^~\\&|Field 1|Field 2|Field 3");

            simpleHeader.removeField(2);
            assert.equal(simpleHeader.toString(), "MSH|^~\\&|Field 1|Field 3");
        });
    });

    describe(".getField()", () => {
        it("should return a field at certain index, check using .toString()", () => {
            let simpleHeader = new Hl7Header("Field 1", "Field 2", ["Component 1", "Component 2"]);
            assert.equal(simpleHeader.toString(), "MSH|^~\\&|Field 1|Field 2|Component 1^Component 2");

            assert.equal(simpleHeader.getField(2), "Field 2");
            assert.equal(simpleHeader.getComponent(3, 1), "Component 1");
            assert.equal(simpleHeader.getField(7), "");
        });
    });
});
