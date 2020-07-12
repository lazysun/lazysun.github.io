import {Piece} from './piece.js';
import {PieceType} from './piece-type.js';
import {Expression} from './expression.js';

export class ExpressionParser {

  private expressionObj = new Expression();

  parse(expression: string):Expression|null {

    if (this.isBlank(expression)) return null;

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
      } else if (this.isOp(singleChar)) {
        this._createNaddPiece(s);
        s = '';
        this._createNaddPiece(singleChar);
      } else {
        s += singleChar;
      }
    }
    this._createNaddPiece(s);
    return this.expressionObj;
  }

  private _createNaddPiece(s: string) {
    let tempPiece :Piece|null= this._createPiece(s);
    if (tempPiece) {
      // console.log("ExpressionParse:: adding new piece " + tempPiece.getStringValue() );
      this.expressionObj.addPiece(tempPiece);
    }
  }

  private _createPiece(s: string): Piece | null {
    if(this.isBlank(s)) return null;
    let pieceType: PieceType = PieceType.STRING;
    if (this.isNumeric(s)) {
      pieceType = s.length == 1 ? PieceType.DIGIT : PieceType.NUMBER;
      return new Piece(s, pieceType);
    } else if (this.isOp(s)) {
      pieceType = PieceType.OPERATOR;
      return new Piece(s, pieceType);
    } else if (s.trim().length > 0) {
      return new Piece(s, pieceType);
    }
    return null;
  }

  isNumeric(singleCharacter: string): boolean {
    return !isNaN(Number(singleCharacter));
  }

  isOp(singleCharacter: string): boolean {
    if (singleCharacter === "+" || singleCharacter === "*" || singleCharacter === "-" || singleCharacter === "%" || singleCharacter === "/" || singleCharacter === "=" || singleCharacter === "?") {
      return true;
    }
    return false;
  }

  isWhiteSpace(singleCharacter: string): boolean {
    if (singleCharacter === ' ') {
      return true;
    }
    return false;
  }

  isBlank(expression: string): boolean {
    if (expression) {
      return expression.trim().length <= 0;
    }
    return true;
  }
}