/// <reference path="../paper.d.ts" />
import { WrapperBox } from '../wrapper-box.js';
var Point = paper.Point;
var Path = paper.Path;
var PointText = paper.PointText;
var Color = paper.Color;
var Group = paper.Group;
export class FractionalTextBlock {
    constructor() {
        this.blockType = "Drawing"; // Drawing // Image // Text
        this.box = WrapperBox.defaultBox;
        this.n = "";
        this.d = "";
        this.padding = 10;
        this.fontSize = '75px';
        this.dirty = false;
        this._group = new Group();
        this._numerator = 0;
        this._denominator = 1;
        this._isNumeratorSet = false;
    }
    setNumbers(denominator, numerator) {
        this._denominator = denominator;
        if (numerator && numerator > 0) {
            this._numerator = numerator;
            this._isNumeratorSet = true;
        }
        else {
            this._numerator = 0;
            this._isNumeratorSet = false;
        }
    }
    getGroup() {
        return this._group;
    }
    static CreateTextBlock(numerator, denominator, fontSize) {
        let block = new FractionalTextBlock();
        block.blockType = 'FractionalText';
        block.n = numerator;
        block.d = denominator;
        if (fontSize) {
            block.fontSize = fontSize;
        }
        block.box = FractionalTextBlock.computeTextBlockDimension(numerator, denominator, block.fontSize);
        return block;
    }
    static computeTextBlockDimension(numerator, denominator, fontSize) {
        let temp = new Group();
        temp.data.undivided = true;
        temp.data.moveable = true;
        // temp.applyMatrix = false;
        let space = FractionalTextBlock._space;
        let numeratorItem = new PointText(FractionalTextBlock._point);
        numeratorItem.justification = 'center';
        numeratorItem.fillColor = new Color('#2f5284');
        numeratorItem.strokeColor = new Color('#2f5284');
        numeratorItem.fontSize = fontSize;
        numeratorItem.content = numerator;
        numeratorItem.data.undivided = true;
        numeratorItem.data.moveable = false;
        temp.addChild(numeratorItem);
        numeratorItem.bounds.topLeft = FractionalTextBlock._point;
        let rect = numeratorItem.bounds;
        let line = new Path.Line(new Point(rect.left, rect.bottom + space), new Point(rect.right, rect.bottom + space));
        line.strokeWidth = 5;
        line.strokeColor = new Color('red');
        line.data.undivided = true;
        line.data.moveable = false;
        temp.addChild(line);
        line.bounds.topLeft = new Point(0, rect.bottom + space);
        let denominatorItem = new PointText(new Point(0, rect.bottom + space + space + space));
        denominatorItem.justification = 'center';
        denominatorItem.fillColor = new Color('#2f5284');
        denominatorItem.strokeColor = new Color('#2f5284');
        denominatorItem.fontSize = fontSize;
        denominatorItem.content = denominator;
        denominatorItem.data.undivided = true;
        denominatorItem.data.moveable = false;
        temp.addChild(denominatorItem);
        denominatorItem.bounds.topLeft = new Point(0, rect.bottom + space + space + space);
        let wrapperBox = WrapperBox._convertRect2Box(temp.bounds);
        temp.remove();
        return wrapperBox;
    }
    setTopLeftPosition(topLeft) {
        this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
    }
    setCenterPosition(center) {
        this.box = WrapperBox.fromCenter(center, this.box.getSize());
    }
    isDirty() {
        return this.dirty;
    }
    draw() {
        this.getGroup().removeChildren();
        if (this.isDirty()) {
            console.log("Not drawing the dirty  fractional text block with text : ");
            return;
        }
        let temp = this._group;
        temp.data.undivided = true;
        temp.data.moveable = true;
        // temp.applyMatrix = false;
        if (this._isNumeratorSet) {
            this.drawUpperLower(temp);
        }
        else {
            this.drawUpper(temp);
        }
        temp.bounds.topLeft = this.box.getTopLeft();
    }
    drawUpper(temp) {
        let numeratorItem = new PointText(FractionalTextBlock._point);
        numeratorItem.justification = 'center';
        numeratorItem.fillColor = new Color('#2f5284');
        numeratorItem.strokeColor = new Color('#2f5284');
        numeratorItem.fontSize = this.fontSize;
        numeratorItem.content = this._denominator + '';
        numeratorItem.data.undivided = true;
        numeratorItem.data.moveable = false;
        temp.addChild(numeratorItem);
        numeratorItem.bounds.topLeft = FractionalTextBlock._point;
    }
    drawUpperLower(temp) {
        let space = FractionalTextBlock._space;
        let numeratorItem = new PointText(FractionalTextBlock._point);
        numeratorItem.justification = 'center';
        numeratorItem.fillColor = new Color('#2f5284');
        numeratorItem.strokeColor = new Color('#2f5284');
        numeratorItem.fontSize = this.fontSize;
        numeratorItem.content = this._numerator + '';
        numeratorItem.data.undivided = true;
        numeratorItem.data.moveable = false;
        temp.addChild(numeratorItem);
        numeratorItem.bounds.topLeft = FractionalTextBlock._point;
        let rect = numeratorItem.bounds;
        let line = new Path.Line(new Point(rect.left, rect.bottom + space), new Point(rect.right, rect.bottom + space));
        line.strokeWidth = 5;
        line.strokeColor = new Color('#2f5284');
        line.data.undivided = true;
        line.data.moveable = false;
        temp.addChild(line);
        line.bounds.topLeft = new Point(0, rect.bottom + space);
        let denominatorItem = new PointText(new Point(0, rect.bottom + space + space + space));
        denominatorItem.justification = 'center';
        denominatorItem.fillColor = new Color('#2f5284');
        denominatorItem.strokeColor = new Color('#2f5284');
        denominatorItem.fontSize = this.fontSize;
        denominatorItem.content = this._denominator + '';
        denominatorItem.data.undivided = true;
        denominatorItem.data.moveable = false;
        temp.addChild(denominatorItem);
        denominatorItem.bounds.topLeft = new Point(0, rect.bottom + space + space + space);
    }
    getBox() {
        return this.box;
    }
    getType() {
        return this.blockType;
    }
}
FractionalTextBlock._point = new Point(0, 0);
FractionalTextBlock._space = 0;
