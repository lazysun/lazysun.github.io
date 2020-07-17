export class HighlightConfig {

  private _borderEnabled:boolean = true;
  private _leaveMarkEnabled:boolean = true;
  private _focusRadius:number = 60;
   isCircularFocusEnabled():boolean {
       return true;
   }

   setFcousRadius(focusRadius:number) {
     this._focusRadius = focusRadius;
   }
   getFocusRadius():number {
    return  this._focusRadius;
   }

   isDragRectEnabled():boolean { //circular focus will be disabled
     return false;
   }

   leaveMarkEnabled():boolean {
     return this._leaveMarkEnabled;
   }

  isBorderEnabled() {
    return this._borderEnabled;
  }

  setBorderEnabled(enable:boolean) {
      this._borderEnabled = enable;
  }
  setLeaveMark(enable:boolean) {
     this._leaveMarkEnabled = enable;
  }



}