/// <reference path="./paper.d.ts" />
declare module Assistant {

  import Path = paper.Path;
  import Point = paper.Point;
  import Event = paper.Event;

  export interface AssistantMode {
    onMouseDown(state:State, event:Event);
  }

  export interface State {
    path:Path;
    selectedItem:Path;
    initialRawPoint:Point;
    initialAlignedPoint:Point;
  }
}