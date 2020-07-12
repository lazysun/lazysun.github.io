import {PieceType} from './piece-type.js';

export class ExpressionElement {

  value:string;
  elementType :PieceType;
  constructor(value:string, elementType:PieceType) {
    this.value = value;
    this.elementType = elementType;
  }
}