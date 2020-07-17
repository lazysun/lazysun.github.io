import { WrapperBox } from '../wrapper-box.js';
var Point = paper.Point;
var Path = paper.Path;
var Color = paper.Color;
import { SlicerMode } from '../modes/slicer-mode.js';
export class PizzaBlock {
    constructor() {
        this.blockType = "Image"; // Drawing // Image // Text
        this.box = WrapperBox.defaultBox;
        this.text = "";
        this.padding = 10;
        this.imagePath = "";
        this.dirty = false;
        this._group = new paper.Group();
    }
    static CreateImageBlock(size, imagePath) {
        let block = new PizzaBlock();
        block.blockType = 'Image';
        block.box = WrapperBox.fromTopLeft(PizzaBlock._point, size);
        if (imagePath) {
            block.imagePath = imagePath;
        }
        SlicerMode.RegisterItem(block.getGroup());
        return block;
    }
    getGroup() {
        return this._group;
    }
    draw() {
        let center = this.box.getCenter();
        let radius = Math.min(this.box.getSize().getWidth(), this.box.getSize().getHeight()) / 2;
        let myCircle = new Path.Circle(center, radius);
        myCircle.fillColor = new Color('#f5de9b');
        myCircle.data.member = true;
        this._group.addChild(myCircle);
    }
    getBox() {
        return this.box;
    }
    getType() {
        return this.blockType;
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
}
PizzaBlock._point = new Point(0, 0);
