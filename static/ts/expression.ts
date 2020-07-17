import {Piece} from './piece';

export class Expression {
  private _separator: string = ' ';
  private _pieces: Piece[] = [];

  addPiece(piece:Piece) {
    this._pieces.push(piece);
  }

  isSeparator(singleCharacter : string):boolean {
    return singleCharacter == this._separator;
  }

  toString(): string {
    let exprString = '';
    this._pieces.forEach((piece)=> {
      // console.log("Expression:: " + piece.getStringValue());
      exprString += (piece.getStringValue() + this._separator);
      // console.log("Expression:: expression till now " + exprString);
    });
    return exprString.trim();
  }

}