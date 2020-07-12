/// <reference path="paper.d.ts" />
import Point = paper.Point;
import {Size} from './size.js';
import Rectangle = paper.Rectangle;

export class WrapperBox {
  position: Point = new Point(0, 0);
  size: Size = new Size(0, 0);

  public static defaultBox = new WrapperBox(new  Point(0, 0), new Size(0, 0));

  public static fromCenter(center: Point, size: Size, padding?: number): WrapperBox {
    let _padding = padding ? padding : 0;
    let top = Math.max(0, center.y - (size.getHeight() / 2) - _padding);
    let left = Math.max(0, center.x - (size.getWidth() / 2) - _padding);
    let _size = new Size(size.getWidth() + _padding * 2, size.getHeight() + _padding * 2);
    let wrapperBox = new WrapperBox(new Point(left, top), size);
    return wrapperBox;
  }

  public static fromTopLeft(topLeft: Point, size: Size, padding?: number): WrapperBox {
    let _padding = padding ? padding : 0;
    let _size = new Size(size.getWidth() + _padding * 2, size.getHeight() + _padding * 2);
    let wrapperBox = new WrapperBox(topLeft, _size);
    return wrapperBox;
  }

  private constructor(position: Point, size: Size) {
    this.position = position;
    this.size = size;
  }

  public getSize() {
    return this.size;
  }

  public getTopLeft(): Point {
    return this.position;
  }

  public getTopRight(): Point {
    return new Point(this.position.x + this.size.getWidth(), this.position.y);
  }

  public getBottomLeft(): Point {
    return new Point(this.position.x, this.position.y + this.size.getHeight());
  }

  public getBottomRight(): Point {
    return new Point(this.position.x + this.size.getWidth(), this.position.y + this.size.getHeight());
  }

  public getCenter(): Point {
    return new Point(this.position.x + this.size.getWidth() / 2, this.position.y + this.size.getHeight() / 2);
  }

  public canFit(box:WrapperBox):boolean {
    let thisRect = WrapperBox._convert2Rect(this);
    let boxRect = WrapperBox._convert2Rect(box);
    return  thisRect.contains(boxRect);
  }

  static _convert2Rect(box:WrapperBox):Rectangle {
     let x = box.getTopLeft().x;
     let y = box.getTopLeft().y;
     let width = box.getSize().getWidth();
     let height = box.getSize().getHeight();
     return new Rectangle(x,y, width, height);
  }

  static _convertRect2Box(rect:Rectangle):WrapperBox {
    return WrapperBox.fromTopLeft(rect.topLeft, new Size(rect.size.width, rect.size.height));
  }
}