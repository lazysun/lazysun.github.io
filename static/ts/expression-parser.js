import { Piece } from './piece.js';
import { PieceType } from './piece-type.js';
import { Expression } from './expression.js';
export class ExpressionParser {
    constructor() {
        this.expressionObj = new Expression();
    }
    parse(expression) {
        if (this.isBlank(expression))
            return null;
        expression = expression.trim();
        // console.log("ExpressionParser: args " + expression);
        // console.log("ExpressionParser: length " + expression.length);
        let s = '';
        for (let i = 0; i < expression.length; i++) {
            let singleChar = expression.charAt(i) + '';
            // console.log("ExpressionParser: char - " + singleChar);
            // console.log("ExpressionParser: s - " + s);
            if (this.expressionObj.isSeparator(singleChar)) {
                this._createNaddPiece(s);
                s = '';
            }
            else if (this.isOp(singleChar)) {
                this._createNaddPiece(s);
                s = '';
                this._createNaddPiece(singleChar);
            }
            else {
                s += singleChar;
            }
        }
        this._createNaddPiece(s);
        return this.expressionObj;
    }
    _createNaddPiece(s) {
        let tempPiece = this._createPiece(s);
        if (tempPiece) {
            // console.log("ExpressionParse:: adding new piece " + tempPiece.getStringValue() );
            this.expressionObj.addPiece(tempPiece);
        }
    }
    _createPiece(s) {
        if (this.isBlank(s))
            return null;
        let pieceType = PieceType.STRING;
        if (this.isNumeric(s)) {
            pieceType = s.length == 1 ? PieceType.DIGIT : PieceType.NUMBER;
            return new Piece(s, pieceType);
        }
        else if (this.isOp(s)) {
            pieceType = PieceType.OPERATOR;
            return new Piece(s, pieceType);
        }
        else if (s.trim().length > 0) {
            return new Piece(s, pieceType);
        }
        return null;
    }
    isNumeric(singleCharacter) {
        return !isNaN(Number(singleCharacter));
    }
    isOp(singleCharacter) {
        if (singleCharacter === "+" || singleCharacter === "*" || singleCharacter === "-" || singleCharacter === "%" || singleCharacter === "/" || singleCharacter === "=" || singleCharacter === "?") {
            return true;
        }
        return false;
    }
    isWhiteSpace(singleCharacter) {
        if (singleCharacter === ' ') {
            return true;
        }
        return false;
    }
    isBlank(expression) {
        if (expression) {
            return expression.trim().length <= 0;
        }
        return true;
    }
}
