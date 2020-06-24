  /// <reference path="./paper.d.ts" />
declare namespace Assistant {

  import Path = paper.Path;
  import Point = paper.Point;
  import Event = paper.Event;

  export interface AssistantMode {
    onMouseDown(state:State, event:Event):void;
    onMouseDrag(state:State, event:Event):void;
    onMouseUp(state:State, event:Event):void;
    onKeyDown(state:State, event:Event):void;
    onKeyDelete(state:State, event:Event):void;
    onKeyEscape(state:State, event:Event):void;
    onKeyTab(state:State, event:Event):void;
    onModeChanged(state:State, mode:string):void;
  }

  export interface State {
    path:Path|null;
    selectedItem:Path|null;
    initialRawPoint:Point|null;
    initialAlignedPoint:Point|null;

    reset():void;
  }
}