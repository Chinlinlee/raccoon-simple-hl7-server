"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Hl7Header_instances, _Hl7Header_init;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Header = void 0;
const field_1 = require("./field");
const segment_1 = require("./segment");
class Hl7Header {
    constructor(...args) {
        _Hl7Header_instances.add(this);
        this.name = "MSH";
        this.delimiters = {
            fieldSeparator: "|",
            componentSeparator: "^",
            subComponentSeparator: "&",
            escapeCharacter: "\\",
            repetitionCharacter: "~",
            segmentSeparator: "\r"
        };
        this.fields = [];
        __classPrivateFieldGet(this, _Hl7Header_instances, "m", _Hl7Header_init).call(this, args);
    }
    addField(fieldValue, position) {
        return segment_1.Hl7Segment.prototype.addField.call(this, fieldValue, position);
    }
    setField(index, fieldValue) {
        return segment_1.Hl7Segment.prototype.setField.call(this, index, fieldValue);
    }
    removeField(index) {
        return segment_1.Hl7Segment.prototype.removeField.call(this, index);
    }
    getField(index, repeatIndex) {
        return segment_1.Hl7Segment.prototype.getField.call(this, index, repeatIndex);
    }
    getComponent(fieldIndex, componentIndex, subComponentIndex) {
        return segment_1.Hl7Segment.prototype.getComponent.call(this, fieldIndex, componentIndex, subComponentIndex);
    }
    toString() {
        let returnString = this.name +
            this.delimiters.fieldSeparator +
            this.delimiters.componentSeparator +
            this.delimiters.repetitionCharacter +
            this.delimiters.escapeCharacter +
            this.delimiters.subComponentSeparator +
            this.delimiters.fieldSeparator;
        for (let i = 0; i < this.fields.length; i++) {
            returnString += this.fields[i].toString(this.delimiters);
            if (i !== this.fields.length - 1) {
                returnString += this.delimiters.fieldSeparator;
            }
        }
        return returnString;
    }
}
exports.Hl7Header = Hl7Header;
_Hl7Header_instances = new WeakSet(), _Hl7Header_init = function _Hl7Header_init(args) {
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (Array.isArray(args[i])) {
                this.fields.push(new field_1.Hl7Field([...args[i]]));
            }
            else {
                this.fields.push(new field_1.Hl7Field(args[i]));
            }
        }
    }
};
