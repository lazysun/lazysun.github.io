/// <reference path="paper.d.ts" />

import Point = paper.Point;

export class Position {

  x:number;
  y:number;
  constructor(x: number, y:number){
    this.x = x;
    this.y = y;
  }

  public getX():number {
    return this.x
  }

  public getY():number {
    return this.y;
  }

  public getPoint() : Point{
    return new Point(this.x, this.y);
  }
}