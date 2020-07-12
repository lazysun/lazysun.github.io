import {Block} from './block.js';
import {WrapperBox} from './wrapper-box.js';
import Point = paper.Point;
import {Size} from './size.js';
import Color = paper.Color;
import Raster = paper.Raster;
import Path = paper.Path;
import Group = paper.Group;

export class ImageBlock implements Block {

  blockType: string = "Image"; // Drawing // Image // Text
  box: WrapperBox = WrapperBox.defaultBox;
  text: string = "";
  padding: number = 10;
  private static _point: Point = new Point(0, 0);
  imagePath = "";
  dirty: boolean = false;
  count: number = 1;
  interPadding: number = 16;
  borderPadding: number = 10;
  private _cols: number = 0;
  private _rows: number = 0;
  private _topBottomBorderPadding: number = 0;
  private _leftRightBorderPadding: number = 0;
  private _interVerticalPadding: number = 0;
  private _interHorizontalPadding: number = 0;
  private _singleImageSize: Size = new Size(0, 0);
  private _sharedRadius: number = 0;
  private _group:Group = new Group();
  getGroup(): Group {
    return this._group;
  }

  public setSharedRadius(sharedRadius: number) {
    this._sharedRadius = sharedRadius;
  }

  private _isSharedRadiusSet(): boolean {
    return this._sharedRadius ? true : false;
  }


  getType(): string {
    return this.blockType;
  }

  public static CreateImageBlock(size: Size, count?: number, imagePath?: string): ImageBlock {
    let block: ImageBlock = new ImageBlock();
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

  getBox(): WrapperBox {
    return this.box;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  public setTopLeftPosition(topLeft: Point) {
    this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
  }

  public setCenterPosition(center: Point) {
    this.box = WrapperBox.fromCenter(center, this.box.getSize());
  }

  public getRadius(): number {
    let size: Size = this.getSingleImageSize();
    return Math.min(size.getWidth(), size.getHeight()) / 2;
  }

  private _calSingleImageSize() {
    let col: number = Number(Math.sqrt(this.count).toFixed(0));
    let rows = col * col < this.count ? col + 1 : col;
    let topBottomBorderPadding: number = (this.borderPadding / rows) * rows;
    let leftRightBorderPadding: number = (this.borderPadding / col) * col;
    let interVerticalPadding: number = (this.interPadding / rows) * rows;
    let interHorizontalPadding: number = (this.interPadding / col) * col;
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

  public getSingleImageSize(): Size {
    return this._singleImageSize;
  }

  draw(): void {
    if (this.isDirty()) {
      console.log("Not drawing the dirty text block with text : " + this.text);
      return;
    }
    if (this.count > 1) {
      let startY: number = this._topBottomBorderPadding + this.box.getTopLeft().y;

      let countTillNow: number = 0;
      for (let y = 0; y < this._rows; y++) {
        startY = startY + (y == 0 ? 0 : this._singleImageSize.getHeight()) + (y == 0 ? 0 : this._interVerticalPadding);
        let startX: number = this._leftRightBorderPadding + this.box.getTopLeft().x;
        for (let x = 0; x < this._cols; x++) {
          startX = startX + (x == 0 ? 0 : this._singleImageSize.getWidth()) + (x == 0 ? 0 : this._interHorizontalPadding);

          // let raster = new Path.Circle({
          //   radius: this._isSharedRadiusSet() ? this._sharedRadius : this.getRadius(),
          //   center: new Point(startX + (this._singleImageSize.getWidth() / 2), startY + (this._singleImageSize.getHeight() / 2)),
          //   fillColor: '#f8bb0c'
          // });

          let radius = this._isSharedRadiusSet() ? this._sharedRadius : this.getRadius();
          let raster = new Raster('apple');
          raster.position = new Point(startX + (this._singleImageSize.getWidth() / 2), startY + (this._singleImageSize.getHeight() / 2));
          raster.size = new paper.Size(radius*2, radius*2);
          this._group.addChild(raster);
          countTillNow++;
          if (countTillNow == this.count) {
            return;
          }
        }
      }
    }
  }

  private isSquare = function (n: number) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
  };
}
