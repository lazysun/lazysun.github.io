import {Piece} from './piece';

export class Expression {
  private _separator: string = ' ';
  private _pieces: Piece[] = [];
  private  _usingAttributeValue: string|null = null;
  private _addAsAttribute = false;

  private _attributes:string[] = [];

  addPiece(piece:Piece) {
    if(this._addAsAttribute) {
      this._usingAttributeValue = piece.getStringValue();
      this._addAsAttribute = false;
    }else if(piece.getStringValue() == 'using') {
      this._addAsAttribute = true;
    }else {
      this._pieces.push(piece);
    }
    console.log(" ------------------ piece.getStringValaue() : " + piece.getStringValue());
  }


  getUsingAttrValue() {
    return this._usingAttributeValue ? this._usingAttributeValue : 'apple';
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