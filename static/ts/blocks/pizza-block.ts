import {Block} from '../block.js';
import {WrapperBox} from '../wrapper-box.js';
import Point = paper.Point;
import {Size} from '../size.js';
import Path = paper.Path;
import Color = paper.Color;
import {SlicerMode} from '../modes/slicer-mode.js';
import PathItem = paper.PathItem;

export class PizzaBlock implements Block{
  blockType: string = "Image"; // Drawing // Image // Text
  box: WrapperBox = WrapperBox.defaultBox;
  text: string = "";
  padding: number = 10;
  private static _point: Point = new Point(0, 0);
  imagePath = "";
  dirty: boolean = false;

  private _group: paper.Group = new paper.Group();

  public static CreateImageBlock(size: Size, imagePath?: string): PizzaBlock {
    let block: PizzaBlock = new PizzaBlock();
    block.blockType = 'Image';
    block.box = WrapperBox.fromTopLeft(PizzaBlock._point, size);
    if (imagePath) {
      block.imagePath = imagePath;
    }
    SlicerMode.RegisterItem(block.getGroup());
    return block;

  }

  getGroup(): paper.Group {
    return this._group;
  }

  draw(): void {
    let center = this.box.getCenter();
    let radius = Math.min(this.box.getSize().getWidth(), this.box.getSize().getHeight())/2;
    let myCircle = new Path.Circle(center, radius);
    // myCircle.fillColor = new Color('#f5de9b');
    myCircle.fillColor = new Color({
      gradient: {
        stops: [['#edd20a', 0.2], ['#f8bb0c', 0.6],['#ed740e', 0.9], ['#e14436', 1]],

        radial: true
      },
      origin: myCircle.position,
      destination: myCircle.bounds.rightCenter
    });

    //#edd20a, #ec1818
    myCircle.data.member = true;
    this._group.addChild(myCircle);
  }

  getBox(): WrapperBox {
    return this.box;
  }

  getType(): string {
    return this.blockType;
  }

  setTopLeftPosition(topLeft: paper.Point): void {
    this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
  }

  setCenterPosition(center: paper.Point): void {
    this.box = WrapperBox.fromCenter(center, this.box.getSize());
  }

  isDirty(): boolean {
    return this.dirty;
  }
}