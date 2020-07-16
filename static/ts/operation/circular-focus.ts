/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
import Point = paper.Point;
import PathItem = paper.PathItem;
import Path = paper.Path;
import Color = paper.Color;
import {Context} from '../context.js';
import {Defaults} from '../defaults';

export class CircularFocus {
  private static _circularFocus:CircularFocus = new CircularFocus();

  public  static  getInstance():CircularFocus {
    return CircularFocus._circularFocus;
  }
  private _focus: PathItem|null = null;
  private _focusBorder:PathItem|null = null;
  private _marks:PathItem[] = [];

  create(context:Context, point: Point, radius:number) {
    if (!point) return;
    this.disable(); // disable the previous focus

    // @ts-ignore
    let rect = view.bounds;
    let rectangle = new Path.Rectangle(
        new Point(rect.x, rect.y),
        new Point(rect.x + rect.width,
            rect.y + rect.height));
    rectangle.fillColor = new Color(0, 0, 0, 0.3);
    rectangle.strokeColor = new Color(0, 0, 0, 0.1);

    let circle = new Path.Circle({
      center: point,
      radius: radius,
      fillColor: new Color(1, 1, 1, 0.1),
      strokeWidth: 2,
      strokeColor: '#f8bb0c'
    });


    this._focus = rectangle.subtract(circle);

    if(context.getSettings().getHighLightConfig().isBorderEnabled()) {
       this._focusBorder = new Path.Circle({
        center: point,
        radius: radius,
        // fillColor: new Color(1, 1, 1, 0.1),
        strokeWidth: 3,
        strokeColor: '#e14436'
      });
    }
    circle.remove();
    rectangle.remove();
  }

  disable() {
    if (this._focus) {
      this._focus.remove();
      this._focus = null;
    }
    if(this._focusBorder) {
      this._focusBorder.remove();
      this._focusBorder = null;
    }
  }

  leaveMark(context:Context,point: Point, radius:number) {
    this.disable();

    let mark = new Path.Circle({
      center: point,
      radius: radius,
      // fillColor: new Color(1, 1, 1, 0.1),
      strokeWidth: 3,
      strokeColor: '#e14436'
    });
    this._marks.push(mark);
    return;
  }

  popMark() {
    let mark = this._marks.pop();
    if(mark) {
      mark.remove();
    }
  }


}