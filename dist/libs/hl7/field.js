"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Hl7Field_instances, _Hl7Field_init;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Field = void 0;
const component_1 = require("./component");
class Hl7Field {
    constructor(...args) {
        _Hl7Field_instances.add(this);
        this.value = [];
        __classPrivateFieldGet(this, _Hl7Field_instances, "m", _Hl7Field_init).call(this, args);
    }
    toString(delimiters) {
        let returnString = "";
        this.value.forEach((item, index) => {
            if (Array.isArray(item)) {
                item.forEach((component, subIndex) => {
                    returnString += component.toString(delimiters);
                    if (subIndex !== item.length - 1)
                        returnString += delimiters.componentSeparator;
                });
            }
            else {
                returnString += item.toString(delimiters);
            }
            if (index !== this.value.length - 1)
                returnString += delimiters.repetitionCharacter;
        });
        return returnString;
    }
}
exports.Hl7Field = Hl7Field;
_Hl7Field_instances = new WeakSet(), _Hl7Field_init = function _Hl7Field_init(args) {
    if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            if (Array.isArray(args[i])) {
                let components = [];
                let arg = args[i];
                for (let y = 0; y < arg.length; y++) {
                    let componentValue = arg[y];
                    components.push(new component_1.Hl7Component(componentValue));
                }
                this.value.push(components);
            }
            else {
                this.value.push(new component_1.Hl7Component(args[i]));
            }
        }
    }
};
