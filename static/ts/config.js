export class Config {
    constructor() {
        this._textMode = 'mathlive';
    }
    isMathliveEnabledForTextMode() {
        if (this._textMode == 'mathlive') {
            return true;
        }
        return false;
    }
}
