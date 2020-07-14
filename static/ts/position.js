/// <reference path="paper.d.ts" />
var Point = paper.Point;
export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getPoint() {
        return new Point(this.x, this.y);
    }
}
