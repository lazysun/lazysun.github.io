/// <reference path="paper.d.ts" />
import { WrapperBox } from './wrapper-box.js';
var Point = paper.Point;
var PointText = paper.PointText;
var Color = paper.Color;
var Group = paper.Group;
export class TextBlock {
    constructor() {
        this.blockType = "Drawing"; // Drawing // Image // Text
        this.box = WrapperBox.defaultBox;
        this.text = "";
        this.padding = 10;
        this.fontSize = '100px';
        this.dirty = false;
        this._group = new Group();
    }
    getGroup() {
        return this._group;
    }
    static CreateTextBlock(text, fontSize) {
        let block = new TextBlock();
        block.blockType = 'Text';
        block.text = text;
        if (fontSize) {
            block.fontSize = fontSize;
        }
        block.box = TextBlock.computeTextBlockDimension(text, block.fontSize);
        return block;
    }
    getType() {
        return this.blockType;
    }
    setText(text) {
        this.text = text;
        this.box = TextBlock.computeTextBlockDimension(text, this.fontSize);
    }
    setTopLeftPosition(topLeft) {
        this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
    }
    setCenterPosition(center) {
        this.box = WrapperBox.fromCenter(center, this.box.getSize());
    }
    static computeTextBlockDimension(text, fontSize) {
        let pointText = new PointText(TextBlock._point);
        pointText.justification = 'center';
        pointText.fillColor = new Color('#2f5284');
        pointText.strokeColor = new Color('#2f5284');
        pointText.fontSize = fontSize;
        pointText.content = text;
        pointText.bounds.topLeft = TextBlock._point;
        let wrapperBox = WrapperBox._convertRect2Box(pointText.bounds);
        pointText.remove();
        return wrapperBox;
    }
    draw() {
        if (this.isDirty()) {
            console.log("Not drawing the dirty text block with text : " + this.text);
            return;
        }
        let pointText = new PointText(this.box.getCenter());
        pointText.justification = 'center';
        pointText.fillColor = new Color('#2f5284');
        pointText.fontSize = this.fontSize;
        pointText.content = this.text;
        pointText.bounds.topLeft = this.box.getTopLeft();
        this._group.addChild(pointText);
    }
    isDirty() {
        return this.dirty;
    }
    getBox() {
        return this.box;
    }
}
TextBlock._point = new Point(0, 0);
