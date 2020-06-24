/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />
import {TestMode} from '../ts/assistant-test-mode.js';
export class HighLightMode {

  static circularFocus = null;

  static onMouseDown(currentState, event) {

    new TestMode().onMouseDown(null, null);
    if (HighLightMode.circularFocus) {
      HighLightMode.circularFocus.remove();

    }
    var rectangle = new Path.Rectangle(
        new Point(view.bounds.x, view.bounds.y),
        new Point(view.bounds.x + view.bounds.width,
            view.bounds.y + view.bounds.height));
    rectangle.fillColor = new Color(0, 0, 0, 0.1);
    rectangle.strokeColor = new Color(0, 0, 0, 0.1);

    var circle = new Path.Circle({
      center: currentState.initialRawPoint,
      radius: 60,
      fillColor: new Color(1, 1, 1, 0.1),
      strokeWidth: 2,
      strokeColor: '#f8bb0c'
    });
    HighLightMode.circularFocus = rectangle.subtract(circle);
    circle.remove();
    rectangle.remove();
  }

  static onMouseDrag(currentState, event) {
    if (HighLightMode.circularFocus) {
      HighLightMode.circularFocus.remove();
      HighLightMode.circularFocus = new Path.Circle({
        center: currentState.initialRawPoint,
        radius: Math.max(85, event.downPoint.subtract(event.point).length),
        // strokeColor: '#333333',
        fillColor: new Color(1, 1, 1, 0.1),
        // opacity: 0.1,
        strokeWidth: 2,
        strokeColor: '#f8bb0c'
      });

    }
  }

  static onMouseUp(currentState, event) {

  }

  static omMenuChanged(currentState, mode) {
    if (mode != modes.HIGHLIGHT && HighLightMode.circularFocus) {
      HighLightMode.circularFocus.remove();
    }
  }

  static onKeyDown(currentState, event) {
    if (event.key == 'escape') {
      if (HighLightMode.circularFocus) {
        HighLightMode.circularFocus.remove();
      }
    }
  }
}

