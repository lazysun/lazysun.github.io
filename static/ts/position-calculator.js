/// <reference path="paper.d.ts" />
import { GlobalAlignment } from './global-alignment.js';
var Point = paper.Point;
export class PositionCalculator {
    static position(alignment, fontSize) {
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
PositionCalculator.defaultPoint = new Point(0, 0);
PositionCalculator.defaultPadding = 10;
