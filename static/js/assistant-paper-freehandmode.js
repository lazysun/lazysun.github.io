import {Defaults} from './assistant-defaults.js';

export class FreeHandMode {

  static onMouseDown = function (currentState, event) {
    currentState.path = new Path({
      segments: [event.point],
      name: 'freehand',
      strokeColor: Defaults.defaultStrokeColor,
      strokeWidth: Defaults.defaultStrokeWidth,
      // Select the path, so we can see its segment points:
      fullySelected: false
    });
  }
  
  static onMouseDrag = function (currentState, event) {
    if(currentState.path) {
      currentState.path.add(event.point);
    }
  }

  static onMouseUp = function (currentState, event) {
    currentState.path = null;
  }

  static onKeyDown = function (currentState, event) {
    // currentState.path = null;
  }
}