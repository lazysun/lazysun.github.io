export class SelectionConfig {
  private _multiSelectionEnabled:boolean =  false;

  isMultiSelectionEnabled() {
    return this._multiSelectionEnabled;
  }

  setMultiSelectionEnabled(enable:boolean) {
    this._multiSelectionEnabled = enable;
  }

}