export class SelectionConfig {
    constructor() {
        this._multiSelectionEnabled = false;
    }
    isMultiSelectionEnabled() {
        return this._multiSelectionEnabled;
    }
    setMultiSelectionEnabled(enable) {
        this._multiSelectionEnabled = enable;
    }
}
