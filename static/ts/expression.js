export class Expression {
    constructor() {
        this._separator = ' ';
        this._pieces = [];
        this._usingAttributeValue = null;
        this._addAsAttribute = false;
        this._attributes = [];
    }
    addPiece(piece) {
        if (this._addAsAttribute) {
            this._usingAttributeValue = piece.getStringValue();
            this._addAsAttribute = false;
        }
        else if (piece.getStringValue() == 'using') {
            this._addAsAttribute = true;
        }
        else {
            this._pieces.push(piece);
        }
        console.log(" ------------------ piece.getStringValaue() : " + piece.getStringValue());
    }
    getUsingAttrValue() {
        return this._usingAttributeValue ? this._usingAttributeValue : 'apple';
    }
    isSeparator(singleCharacter) {
        return singleCharacter == this._separator;
    }
    toString() {
        let exprString = '';
        this._pieces.forEach((piece) => {
            // console.log("Expression:: " + piece.getStringValue());
            exprString += (piece.getStringValue() + this._separator);
            // console.log("Expression:: expression till now " + exprString);
        });
        return exprString.trim();
    }
}
