import assert from 'node:assert';
import { describe, it } from "node:test";
import { Hl7Component } from "../../libs/hl7/component";
import { DELIMITERS } from '../../libs/hl7/delimiters';

describe('HL7 Component', () => { 
    describe('.toString()', () => {
        it('should return hl7 with proper structure for single component', () => {
            let singleComponent = new Hl7Component('Single Component');
            assert.equal(singleComponent.toString(DELIMITERS), 'Single Component');
        });

        it('should return hl7 with proper structure for component with sub-component', () => {
            let componentWithSubComponent = new Hl7Component(['First Component', 'Second Component']);
            assert.equal(componentWithSubComponent.toString(DELIMITERS), 'First Component&Second Component');
        });

        it('should return hl7 with proper structure for component with repeating component', () => {
            let repeatingComponent = new Hl7Component('First Repeat', 'Second Repeat');
            assert.equal(repeatingComponent.toString(DELIMITERS), 'First Repeat~Second Repeat');
        });

        it('should return hl7 with proper structure for repeating component with sub-components', () => {
            let repeatingComponentWithSubComponent = new Hl7Component(['First Component', 'Second Component'], ['First Repeat', 'Second Repeat']);
            assert.equal(repeatingComponentWithSubComponent.toString(DELIMITERS), 'First Component&Second Component~First Repeat&Second Repeat');
        })
    })
});