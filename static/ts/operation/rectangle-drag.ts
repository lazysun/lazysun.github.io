/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
import Point = paper.Point;
import {Context} from '../context.js';
import {Defaults} from '../defaults.js';
import Path = paper.Path;
import Color = paper.Color;
import PathItem = paper.PathItem;

export class RectangleDrag {
  private static _rectDrag:RectangleDrag = new RectangleDrag();

  public  static  getInstance():RectangleDrag {
    return RectangleDrag._rectDrag;
  }

  private _dragRect:PathItem|null = null;
  private _marks:PathItem[] = [];

  create(context:Context, startingPoint:Point , endPoint:Point, adjustPadding:boolean) {
    this.disable();
    let x = Math.min(startingPoint.x, endPoint.x);
    let y = Math.min(startingPoint.y, endPoint.y)
    let mx = Math.max(startingPoint.x, endPoint.x);
    let my = Math.max(startingPoint.y, endPoint.y);
    if(adjustPadding) {
      let padding: number = Defaults.selectionRectanglePadding;
      // @ts-ignore
      let bounds = view.bounds;

      x = x - padding;
      if(x < bounds.left) {
        x = bounds.left
      }
      y = y - padding;
      if(y < bounds.top) {
        y= bounds.top;
      }
      mx = mx + padding;
      if(mx > bounds.right) {
        mx = bounds.right;
      }
      my = my + padding;
      if(my > bounds.bottom) {
        my = bounds.bottom;
      }
    }

    // @ts-ignore
    let rect = view.bounds;
    let rectangle = new Path.Rectangle(
        new Point(rect.x, rect.y),
        new Point(rect.x + rect.width,
            rect.y + rect.height));
    rectangle.fillColor = new Color(0, 0, 0, 0.1);
    rectangle.strokeColor = new Color(0, 0, 0, 0.1);

    let tempDragRectangle = new Path.Rectangle({
      point: [x, y],
      size: [mx - x, my - y],
      strokeColor: Defaults.lightGreyColor,
      // dashArray: [4, 10],
      strokeWidth: Defaults.selectionRectangleStrokeWidth,
      strokeCap: 'round',
      // @ts-ignore
      fillColor: new Color('rgba(255, 255, 0, 0.00001)')
    });

    this._dragRect = rectangle.subtract(tempDragRectangle);
    tempDragRectangle.remove();
    rectangle.remove();
  }

  leaveMark(context:Context, startingPoint:Point , endPoint:Point, adjustPadding:boolean) {
    this.disable();
    let x = Math.min(startingPoint.x, endPoint.x);
    let y = Math.min(startingPoint.y, endPoint.y)
    let mx = Math.max(startingPoint.x, endPoint.x);
    let my = Math.max(startingPoint.y, endPoint.y);
    if(adjustPadding) {
      let padding: number = Defaults.selectionRectanglePadding;
      // @ts-ignore
      let bounds = view.bounds;

      x = x - padding;
      if(x < bounds.left) {
        x = bounds.left
      }
      y = y - padding;
      if(y < bounds.top) {
        y= bounds.top;
      }
      mx = mx + padding;
      if(mx > bounds.right) {
        mx = bounds.right;
      }
      my = my + padding;
      if(my > bounds.bottom) {
        my = bounds.bottom;
      }
    }

    let mark = new Path.Rectangle({
      point: [x, y],
      size: [mx - x, my - y],
      // dashArray: [4, 10],
      strokeWidth: 1,
      strokeColor: '#e14436',
      strokeCap: 'round',
      // @ts-ignore
      // fillColor: new Color('rgba(255, 255, 0, 0.00001)')
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

  disable() {
    if(this._dragRect) {
      this._dragRect.remove();
      this._dragRect = null;
    }
  }


}