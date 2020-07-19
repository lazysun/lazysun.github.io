import { WrapperBox } from './wrapper-box.js';
var Point = paper.Point;
import { Size } from './size.js';
var Raster = paper.Raster;
var Group = paper.Group;
export class ImageBlock {
    constructor() {
        this.blockType = "Image"; // Drawing // Image // Text
        this.box = WrapperBox.defaultBox;
        this.text = "";
        this.padding = 10;
        this.imagePath = "";
        this.dirty = false;
        this.count = 1;
        this.interPadding = 16;
        this.borderPadding = 10;
        this._cols = 0;
        this._rows = 0;
        this._topBottomBorderPadding = 0;
        this._leftRightBorderPadding = 0;
        this._interVerticalPadding = 0;
        this._interHorizontalPadding = 0;
        this._singleImageSize = new Size(0, 0);
        this._sharedRadius = 0;
        this._group = new Group();
        this.isSquare = function (n) {
            return n > 0 && Math.sqrt(n) % 1 === 0;
        };
    }
    getGroup() {
        return this._group;
    }
    setSharedRadius(sharedRadius) {
        this._sharedRadius = sharedRadius;
    }
    _isSharedRadiusSet() {
        return this._sharedRadius ? true : false;
    }
    getType() {
        return this.blockType;
    }
    static CreateImageBlock(size, count, imagePath) {
        let block = new ImageBlock();
        block.blockType = 'Image';
        block.box = WrapperBox.fromTopLeft(ImageBlock._point, size);
        if (imagePath) {
            block.imagePath = imagePath;
        }
        if (count) {
            block.count = count;
        }
        block._calSingleImageSize();
        return block;
    }
    getBox() {
        return this.box;
    }
    isDirty() {
        return this.dirty;
    }
    setTopLeftPosition(topLeft) {
        this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
    }
    setCenterPosition(center) {
        this.box = WrapperBox.fromCenter(center, this.box.getSize());
    }
    getRadius() {
        let size = this.getSingleImageSize();
        return Math.min(size.getWidth(), size.getHeight()) / 2;
    }
    _calSingleImageSize() {
        let col = Number(Math.sqrt(this.count).toFixed(0));
        let rows = col * col < this.count ? col + 1 : col;
        let topBottomBorderPadding = (this.borderPadding / rows) * rows;
        let leftRightBorderPadding = (this.borderPadding / col) * col;
        let interVerticalPadding = (this.interPadding / rows) * rows;
        let interHorizontalPadding = (this.interPadding / col) * col;
        let h = (this.box.getSize().getHeight() / rows) - ((2 * topBottomBorderPadding) / rows) - interVerticalPadding + interVerticalPadding / rows;
        let w = (this.box.getSize().getWidth() / col) - ((2 * leftRightBorderPadding) / col) - interHorizontalPadding + interHorizontalPadding / col;
        this._cols = col;
        this._rows = rows;
        this._topBottomBorderPadding = topBottomBorderPadding;
        this._leftRightBorderPadding = leftRightBorderPadding;
        this._interVerticalPadding = interVerticalPadding;
        this._interHorizontalPadding = interHorizontalPadding;
        this._singleImageSize = new Size(w, h);
        return this._singleImageSize;
    }
    getSingleImageSize() {
        return this._singleImageSize;
    }
    draw() {
        if (this.isDirty()) {
            console.log("Not drawing the dirty text block with text : " + this.text);
            return;
        }
        if (this.count > 0) {
            let startY = this._topBottomBorderPadding + this.box.getTopLeft().y;
            let countTillNow = 0;
            for (let y = 0; y < this._rows; y++) {
                startY = startY + (y == 0 ? 0 : this._singleImageSize.getHeight()) + (y == 0 ? 0 : this._interVerticalPadding);
                let startX = this._leftRightBorderPadding + this.box.getTopLeft().x;
                for (let x = 0; x < this._cols; x++) {
                    startX = startX + (x == 0 ? 0 : this._singleImageSize.getWidth()) + (x == 0 ? 0 : this._interHorizontalPadding);
                    // let raster = new Path.Circle({
                    //   radius: this._isSharedRadiusSet() ? this._sharedRadius : this.getRadius(),
                    //   center: new Point(startX + (this._singleImageSize.getWidth() / 2), startY + (this._singleImageSize.getHeight() / 2)),
                    //   fillColor: '#f8bb0c'
                    // });
                    let radius = this._isSharedRadiusSet() ? this._sharedRadius : this.getRadius();
                    let raster = new Raster(this.imagePath);
                    raster.position = new Point(startX + (this._singleImageSize.getWidth() / 2), startY + (this._singleImageSize.getHeight() / 2));
                    raster.size = new paper.Size(radius * 2, radius * 2);
                    this._group.addChild(raster);
                    countTillNow++;
                    if (countTillNow == this.count) {
                        return;
                    }
                }
            }
        }
    }
}
ImageBlock._point = new Point(0, 0);
