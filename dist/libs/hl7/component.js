"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hl7Component = void 0;
class Hl7Component {
    constructor(...args) {
        this.value = args;
    }
    toString(delimiters) {
        let returnString = "";
        for (let i = 0; i < this.value.length; i++) {
            if (Array.isArray(this.value[i])) {
                for (let y = 0; y < this.value[i].length; y++) {
                    returnString += this.value[i][y];
                    if (y != this.value[i].length - 1) {
                        returnString += delimiters.subComponentSeparator;
                    }
                }
            }
            else {
                returnString += this.value[i];
            }
            if (i != this.value.length - 1) {
                returnString += delimiters.repetitionCharacter;
            }
        }
        return returnString;
    }
}
exports.Hl7Component = Hl7Component;
