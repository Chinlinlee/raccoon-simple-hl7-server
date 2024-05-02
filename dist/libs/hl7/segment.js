"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Hl7Segment_instances, _Hl7Segment_init;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Segment = void 0;
const component_1 = require("./component");
const field_1 = require("./field");
const delimiters_1 = require("./delimiters");
class Hl7Segment {
    constructor(...args) {
        _Hl7Segment_instances.add(this);
        this.name = "";
        this.fields = [];
        __classPrivateFieldGet(this, _Hl7Segment_instances, "m", _Hl7Segment_init).call(this, args);
    }
    addField(fieldValue, position) {
        if (position) {
            if (this.fields.length > position - 1) {
                this.setField(position, fieldValue);
            }
            else {
                let curLength = this.fields.length;
                while (curLength <= position - 2) {
                    this.addField("");
                    curLength = this.fields.length;
                }
                this.addField(fieldValue);
            }
        }
        else {
            if (typeof fieldValue == "object") {
                if (Array.isArray(fieldValue)) {
                    this.fields.push(new field_1.Hl7Field(fieldValue));
                }
                else {
                    this.fields.push(fieldValue);
                }
            }
            else {
                this.fields.push(new field_1.Hl7Field(fieldValue));
            }
        }
    }
    setField(index, fieldValue) {
        if (this.fields.length >= index) {
            this.fields[index - 1] = new field_1.Hl7Field(fieldValue);
        }
    }
    removeField(index) {
        if (this.fields.length >= index) {
            this.fields.splice(index - 1, 1);
        }
    }
    getField(index, repeatIndex) {
        if (this.fields.length >= index) {
            let field = this.fields[index - 1];
            if (repeatIndex) {
                if (field.value.length >= repeatIndex) {
                    return field.value[repeatIndex - 1].toString(delimiters_1.DELIMITERS);
                }
                return "";
            }
            return field.toString(delimiters_1.DELIMITERS);
        }
        return "";
    }
    getComponent(fieldIndex, componentIndex, subComponentIndex) {
        if (this.fields.length >= fieldIndex) {
            let field = this.fields[fieldIndex - 1];
            let components = (field.value[0]);
            if (components.length >= componentIndex) {
                let component = components[componentIndex - 1];
                if (subComponentIndex) {
                    if (component.value[0].length >= subComponentIndex) {
                        return component.value[0][subComponentIndex - 1].toString();
                    }
                    return "";
                }
                return component.toString(delimiters_1.DELIMITERS);
            }
            return "";
        }
        return "";
    }
    setComponent(fieldIndex, componentIndex, value) {
        if (this.fields.length >= fieldIndex) {
            let field = this.fields[fieldIndex - 1];
            let components = (field.value[0]);
            if (components.length >= componentIndex) {
                components[componentIndex - 1] = new component_1.Hl7Component(value);
            }
        }
    }
    toString(delimiters) {
        let returnString = this.name + delimiters.fieldSeparator;
        for (let i = 0; i < this.fields.length; i++) {
            returnString += this.fields[i].toString(delimiters);
            if (i != this.fields.length - 1) {
                returnString += delimiters.fieldSeparator;
            }
        }
        return returnString;
    }
}
exports.Hl7Segment = Hl7Segment;
_Hl7Segment_instances = new WeakSet(), _Hl7Segment_init = function _Hl7Segment_init(args) {
    if (args.length >= 1) {
        this.name = args[0];
    }
    if (args.length >= 2) {
        for (let i = 1; i < args.length; i++) {
            let arg = args[i];
            if (Array.isArray(arg)) {
                this.fields.push(new field_1.Hl7Field([...args[i]]));
            }
            else {
                this.fields.push(new field_1.Hl7Field(args[i]));
            }
        }
    }
};
