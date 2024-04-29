export type Delimiters = {
    fieldSeparator: string,
    componentSeparator: string,
    subComponentSeparator: string,
    escapeCharacter: string,
    repetitionCharacter: string,
    segmentSeparator: string
};

export const DELIMITERS: Delimiters = {
    fieldSeparator: '|',
    componentSeparator: '^',
    subComponentSeparator: '&',
    escapeCharacter: '\\',
    repetitionCharacter: '~',
    segmentSeparator: '\r'
};