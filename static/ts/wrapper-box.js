/// <reference path="paper.d.ts" />
var Point = paper.Point;
import { Size } from './size.js';
var Rectangle = paper.Rectangle;
export class WrapperBox {
    constructor(position, size) {
        this.position = new Point(0, 0);
        this.size = new Size(0, 0);
        this.position = position;
        this.size = size;
    }
    static fromCenter(center, size, padding) {
        let _padding = padding ? padding : 0;
        let top = Math.max(0, center.y - (size.getHeight() / 2) - _padding);
        let left = Math.max(0, center.x - (size.getWidth() / 2) - _padding);
        let _size = new Size(size.getWidth() + _padding * 2, size.getHeight() + _padding * 2);
        let wrapperBox = new WrapperBox(new Point(left, top), size);
        return wrapperBox;
    }
    static fromTopLeft(topLeft, size, padding) {
        let _padding = padding ? padding : 0;
        let _size = new Size(size.getWidth() + _padding * 2, size.getHeight() + _padding * 2);
        let wrapperBox = new WrapperBox(topLeft, _size);
        return wrapperBox;
    }
    getSize() {
        return this.size;
    }
    getTopLeft() {
        return this.position;
    }
    getTopRight() {
        return new Point(this.position.x + this.size.getWidth(), this.position.y);
    }
    getBottomLeft() {
        return new Point(this.position.x, this.position.y + this.size.getHeight());
    }
    getBottomRight() {
        return new Point(this.position.x + this.size.getWidth(), this.position.y + this.size.getHeight());
    }
    getCenter() {
        return new Point(this.position.x + this.size.getWidth() / 2, this.position.y + this.size.getHeight() / 2);
    }
    canFit(box) {
        let thisRect = WrapperBox._convert2Rect(this);
        let boxRect = WrapperBox._convert2Rect(box);
        return thisRect.contains(boxRect);
    }
    static _convert2Rect(box) {
        let x = box.getTopLeft().x;
        let y = box.getTopLeft().y;
        let width = box.getSize().getWidth();
        let height = box.getSize().getHeight();
        return new Rectangle(x, y, width, height);
    }
    static _convertRect2Box(rect) {
        return WrapperBox.fromTopLeft(rect.topLeft, new Size(rect.size.width, rect.size.height));
    }
}
WrapperBox.defaultBox = new WrapperBox(new Point(0, 0), new Size(0, 0));
