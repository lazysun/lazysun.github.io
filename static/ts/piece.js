export class Piece {
    constructor(value, pieceType) {
        this._numberValue = 0;
        this._value = value;
        this._numberValue = Number(this._value);
        this._pieceType = pieceType;
    }
    getNumericValue() {
        return this._numberValue;
    }
    getStringValue() {
        return this._value;
    }
}
