export class Expression {
    constructor() {
        this._separator = ' ';
        this._pieces = [];
    }
    addPiece(piece) {
        this._pieces.push(piece);
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
