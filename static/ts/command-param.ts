export class CommandParam {

  value:string;
  _numberValue:number = 0;
  _showViz:boolean = false;
  _vizHelp:string = "apple";
  _placeHolder:boolean = false;

  constructor(value:string) {
    this.value = value;
    this._numberValue = Number(this.value)
  }

  isNumeric():boolean {
    return !isNaN(this._numberValue);
  }

  isSingleDigit():boolean {
    return this.isNumeric() && (this._numberValue < 10 && this._numberValue > -1)
  }

  isDoubleDigit():boolean {
    return this.isNumeric() && (this._numberValue > 9 && this._numberValue < 100)
  }

  isOperator():boolean {
    if(this.value === "+" || this.value === "-" || this.value === "%" || this.value === "/" || this.value === "*") {
      return true;
    }
    return false;
  }

  isVisualizationEnabled():boolean {
    return this._showViz;
  }

  getNumericValue():number {
    return this._numberValue;
  }

  getStringValue():string {
    return this.value;
  }

  enablePlaceholder() {
    this._placeHolder = true;
  }

  enableVisualization(showVisualization:boolean, imagePath:string) {
    this._showViz = showVisualization;
    this._vizHelp = imagePath;
  }
}