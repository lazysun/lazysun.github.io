import {PieceType} from './piece-type.js';

export class Piece {

  private  _value:string;
  private _numberValue:number = 0;
  private  _pieceType:PieceType;

  constructor(value:string, pieceType:PieceType) {
    this._value = value;
    this._numberValue = Number(this._value);
    this._pieceType = pieceType;
  }


  getNumericValue():number {
    return  this._numberValue;
  }

  getStringValue():string {
    return  this._value;
  }
}