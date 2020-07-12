/// <reference path="paper.d.ts" />
import {GlobalAlignment} from './global-alignment.js';
import {FontSize} from './font-size.js';
import Point = paper.Point;

export class PositionCalculator {

  private static defaultPoint: Point = new Point(0,0);
  private static defaultPadding: number = 10;

  public static position( alignment:GlobalAlignment, fontSize:FontSize):Point {
     switch (alignment) {
       case GlobalAlignment.BOTTOM_LEFT:
          return PositionCalculator.defaultPoint;
       case GlobalAlignment.BOTTOM_CENTER:
       case GlobalAlignment.BOTTOM_RIGHT:
       case GlobalAlignment.MID_LEFT:
       case GlobalAlignment.MID_CENTER:
       case GlobalAlignment.MID_RIGHT:
       default:
         return PositionCalculator.defaultPoint;
     }

     return PositionCalculator.defaultPoint;
  }

}