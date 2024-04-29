import { Hl7Component } from "./component";
import { Delimiters } from "./delimiters";

export class Hl7Field {
    value: (Hl7Component | Hl7Component[])[];

    constructor(...args: (string | string[])[] | ((string | string[])[])[]) {
        this.value = [];
        this.#init(args);
    }

    #init(args: (string | string[])[] | ((string | string[])[])[]) {
        if (args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                if (Array.isArray(args[i])) {
                    let components: Hl7Component[] = [];
                    let arg = args[i] as string[];
                    for (let y = 0; y < arg.length; y++) {
                        let componentValue = arg[y] as string;
                        components.push(new Hl7Component(componentValue));
                    }
                    this.value.push(components);
                } else {
                    this.value.push(new Hl7Component(args[i] as string));
                }
            }
        }
    }

    toString(delimiters: Delimiters) {
        let returnString = "";

        this.value.forEach((item, index) => {
            if (Array.isArray(item)) {
                item.forEach((component, subIndex) => {
                    returnString += component.toString(delimiters);
                    if (subIndex !== item.length - 1)
                        returnString += delimiters.componentSeparator;
                });
            } else {
                returnString += item.toString(delimiters);
            }

            if (index !== this.value.length - 1)
                returnString += delimiters.repetitionCharacter;
        });

        return returnString;
    }
}
