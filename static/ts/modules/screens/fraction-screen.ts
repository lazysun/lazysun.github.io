import {Expression} from '../../expression';

export class FractionScreen {

  private _expression:Expression;

  constructor(expression:Expression) {
    this._expression = expression;
    console.log("FractionScreen::" + expression);
  }

  draw() {

  }

}