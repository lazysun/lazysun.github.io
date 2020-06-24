import {Defaults} from './assistant-defaults.js';
import {AssistantPaperUtil} from '../js/assistant-paper-util.js';
export class LineMode {

  // features defaults
  static alignToGrids = true;
  static alignTempPoints = false;

  static omMouseDown(currentState, event) {
  //    Do nothing as raw point and aligned point have already been calculated
  }

  static onMouseDrag(currentState, event){
    LineMode._updatePath(currentState, event.point, false);
  }

  static onMouseUp(currentState, event) {
    LineMode._updatePath(currentState, event.point, true);
    currentState.reset();
  }

  static _updatePath(currentState, rawCurrentPoint, isTerminalPoint) {
    if (currentState.initialRawPoint) {
      var startingPoint = LineMode.alignToGrids ? currentState.initialAlignedPoint : currentState.initialRawPoint;
      var endingPoint;
      if(isTerminalPoint) {
        endingPoint = LineMode.alignToGrids ? new AssistantPaperUtil().computeAlignedPoint(
            rawCurrentPoint) : rawCurrentPoint;
      }else {
        endingPoint = LineMode.alignToGrids && LineMode.alignTempPoints ? new AssistantPaperUtil().computeAlignedPoint(
            rawCurrentPoint) : rawCurrentPoint;
      }
      if (currentState.path) {
        currentState.path.removeSegments();
        currentState.path.add(startingPoint);
        currentState.path.add(endingPoint);
      } else {
        currentState.path = new Path({
          segments: [startingPoint],
          name: 'line',
          strokeColor: Defaults.defaultStrokeColor,
          strokeWidth: Defaults.defaultStrokeWidth,
          // Select the path, so we can see its segment points:
          fullySelected: false
        });
        currentState.path.add(endingPoint);
      }
    }
  }

}