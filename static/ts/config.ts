export class Config {

  private _textMode:string = 'mathlive';

  public isMathliveEnabledForTextMode():boolean {
    if(this._textMode == 'mathlive') {
      return true;
    }
    return false;
  }

  public isVisualizationEnabledByDefault():boolean {
    return true;
  }

  public getMaxNumforVisualization():number {
    return 20;
  }

  public isVisualizationShared():boolean {
    return true;
  }

  public isTextModeEnabledOnDblClick():boolean {
    return true;
  }

  isGridEnabled() {
    return false;
  }

}