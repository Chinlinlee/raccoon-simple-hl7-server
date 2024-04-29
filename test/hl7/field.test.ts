import { Hl7Field } from "../../libs/hl7/field";
import { describe, it } from "node:test";
import assert from "node:assert";
import { DELIMITERS } from "../../libs/hl7/delimiters";

describe('HL7 Field', () => {
    describe('.toString()', () => {
        it('should return hl7 with proper structure for single field', () => {
            let singleField = new Hl7Field('Single Field');
            assert.equal(singleField.toString(DELIMITERS), 'Single Field');
        });

        it('should return hl7 with proper structure for repeating field', () => {
            let repeatingSingleValueField = new Hl7Field('Field Value', 'Repeat Field Value');
            assert.equal(repeatingSingleValueField.toString(DELIMITERS), 'Field Value~Repeat Field Value');
        });

        it('should return hl7 with proper structure for field with components', () => {
            let fieldWithComponents = new Hl7Field(['First Component', 'Second Component']);
            assert.equal(fieldWithComponents.toString(DELIMITERS), 'First Component^Second Component');
        });

        it('should return hl7 with proper structure for field with components with sub-components', () => {
            let fieldWithComponentsWithSubComponents = new Hl7Field([
                'Component 1',
                ['Component 2 Sub1', 'Component 2 Sub2'],
                'Component 3',
            ]);
            assert.equal(
                fieldWithComponentsWithSubComponents.toString(DELIMITERS),
                'Component 1^Component 2 Sub1&Component 2 Sub2^Component 3'
            );
        });
    });
});