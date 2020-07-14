export class CommandParam {
    constructor(value) {
        this._numberValue = 0;
        this._showViz = false;
        this._vizHelp = "apple";
        this._placeHolder = false;
        this.value = value;
        this._numberValue = Number(this.value);
    }
    isNumeric() {
        return !isNaN(this._numberValue);
    }
    isSingleDigit() {
        return this.isNumeric() && (this._numberValue < 10 && this._numberValue > -1);
    }
    isDoubleDigit() {
        return this.isNumeric() && (this._numberValue > 9 && this._numberValue < 100);
    }
    isOperator() {
        if (this.value === "+" || this.value === "-" || this.value === "%" || this.value === "/" || this.value === "*") {
            return true;
        }
        return false;
    }
    isVisualizationEnabled() {
        return this._showViz;
    }
    getNumericValue() {
        return this._numberValue;
    }
    getStringValue() {
        return this.value;
    }
    enablePlaceholder() {
        this._placeHolder = true;
    }
    enableVisualization(showVisualization, imagePath) {
        this._showViz = showVisualization;
        this._vizHelp = imagePath;
    }
}
