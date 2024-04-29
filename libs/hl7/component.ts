import type { Delimiters } from "./delimiters";


export class Hl7Component {
    value: (string | string[])[];

    constructor(...args: (string | string[])[]) {
        this.value = args;
    }

    toString(delimiters: Delimiters) {
        let returnString = "";

        for (let i = 0 ; i < this.value.length ; i++) { 
            if (Array.isArray(this.value[i])) {
                for (let y = 0; y < this.value[i].length ; y++) {
                    returnString += this.value[i][y];
                    if (y != this.value[i].length - 1) {
                        returnString += delimiters.subComponentSeparator;
                    }
                }
            } else {
                returnString += this.value[i];
            }

            if (i != this.value.length - 1) {
                returnString += delimiters.repetitionCharacter;
            }
        }

        return returnString;
    }
}