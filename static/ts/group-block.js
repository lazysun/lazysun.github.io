import { WrapperBox } from './wrapper-box.js';
import { Layout } from './layout.js';
var Point = paper.Point;
import { Size } from './size.js';
var Group = paper.Group;
export class GroupBlock {
    constructor(layout) {
        this.layout = Layout.HORIZONTAL;
        this.blocks = [];
        this.interBoxPadding = 2;
        this.blockType = "Group";
        this._group = new Group();
        this.layout = layout;
        this.box = WrapperBox.fromTopLeft(GroupBlock._point, new Size(0, 0));
    }
    getGroup() {
        return this._group;
    }
    getType() {
        return this.blockType;
    }
    addBlock(block) {
        this.blocks.push(block);
        this._updateBox(false);
    }
    getLayout() {
        return this.layout;
    }
    getBlocks() {
        return this.blocks;
    }
    draw() {
        this._updateBox(true);
        this.blocks.forEach((block) => {
            block.draw();
            this._group.addChild(block.getGroup());
        });
    }
    getBox() {
        return this.box;
    }
    isDirty() {
        return false;
    }
    setCenterPosition(center) {
        this.box = WrapperBox.fromCenter(center, this.box.getSize());
        this._updateBox(false);
    }
    setTopLeftPosition(topLeft) {
        this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
        this._updateBox(false);
    }
    _updateBox(align) {
        let height = 0;
        let width = 0;
        let topLeft = this.box.getTopLeft();
        let top = topLeft.y;
        let left = topLeft.x;
        this.blocks.forEach((block) => {
            switch (this.layout) {
                case Layout.HORIZONTAL:
                    height = Math.max(height, block.getBox().getSize().getHeight());
                    width += block.getBox().getSize().getWidth();
                    block.setTopLeftPosition(new Point(left, top));
                    left = left + width;
                    break;
                case Layout.VERTICAL:
                    width = Math.max(width, block.getBox().getSize().getWidth());
                    height += block.getBox().getSize().getHeight();
                    block.setTopLeftPosition(new Point(left, top));
                    top = top + height;
                    break;
            }
        });
        // aligning boxes
        if (align) {
            this.blocks.forEach((block) => {
                switch (this.layout) {
                    case Layout.HORIZONTAL:
                        // height = Math.max(height, block.getBox().getSize().getHeight());
                        // width += block.getBox().getSize().getWidth();
                        // block.setTopLeftPosition(new Point(left, top));
                        // left = left + width;
                        break;
                    case Layout.VERTICAL:
                        // let tempBox = WrapperBox.fromTopLeft(block.getBox().getTopLeft(), new Size(block.getBox().getSize().getWidth(), block.getBox().getSize().getHeight()));
                        // console.log("Group Block : Adjusting ");
                        // let rect = new Path.Rectangle({
                        //   point:tempBox.getTopLeft(),
                        //   size: new paper.Size(width, block.getBox().getSize().getHeight()),
                        //   strokeColor:'blue'
                        // });
                        if (block.getBox().getSize().getWidth() + 1 < width) {
                            // console.log("Group block:: " + typeof block);
                            console.log("Group block:: type: " + block.getType() + "  block.width:" + block.getBox().getSize().getWidth() + "  box.width:" + width);
                            let tempBox = WrapperBox.fromTopLeft(block.getBox().getTopLeft(), new Size(width, block.getBox().getSize().getHeight()));
                            // console.log("Group Block : Adjusting ");
                            // let rect = new Path.Rectangle({
                            //   point:tempBox.getTopLeft(),
                            //   size: new paper.Size(width, block.getBox().getSize().getHeight()),
                            //   strokeColor:'red'
                            // });
                            // let circle = new Path.Circle({
                            //   center: tempBox.getCenter(),
                            //   radius: 10,
                            //   fillColor:'red'
                            //
                            // });
                            // console.log("Group Block :: before center " + block.getBox().getCenter());
                            // console.log("Group Block :: before size " + block.getBox().getSize());
                            block.setCenterPosition(tempBox.getCenter());
                            // console.log("Group Block :: center " + block.getBox().getCenter());
                            // console.log("Group Block :: size " + block.getBox().getSize());
                        }
                        break;
                }
            });
        }
        this.box = WrapperBox.fromTopLeft(topLeft, new Size(width, height));
    }
}
GroupBlock._point = new Point(0, 0);
