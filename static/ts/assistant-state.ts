/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />

import State = Assistant.State;
import Path = paper.Path;
import Point = paper.Point;

export class AssistantState implements State {

  initialAlignedPoint: Point|null;
  initialRawPoint: Point|null;
  path: Path|null;
  selectedItem: Path|null;

  constructor() {
   this.initialAlignedPoint = null;
   this.initialRawPoint = null;
   this.path = null;
   this.selectedItem = null;
  }

  reset(): void {
    this.initialAlignedPoint = null;
    this.initialRawPoint = null;
    this.path = null;
    this.selectedItem = null;
  }


}