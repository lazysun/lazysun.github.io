export class HighlightConfig {
    constructor() {
        this._borderEnabled = true;
        this._leaveMarkEnabled = true;
        this._focusRadius = 60;
    }
    isCircularFocusEnabled() {
        return true;
    }
    setFcousRadius(focusRadius) {
        this._focusRadius = focusRadius;
    }
    getFocusRadius() {
        return this._focusRadius;
    }
    isDragRectEnabled() {
        return false;
    }
    leaveMarkEnabled() {
        return this._leaveMarkEnabled;
    }
    isBorderEnabled() {
        return this._borderEnabled;
    }
    setBorderEnabled(enable) {
        this._borderEnabled = enable;
    }
    setLeaveMark(enable) {
        this._leaveMarkEnabled = enable;
    }
}
