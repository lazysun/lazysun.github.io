export class Config {

  private _textMode:string = 'mathlive';

  public isMathliveEnabledForTextMode():boolean {
    if(this._textMode == 'mathlive') {
      return true;
    }
    return false;
  }
}