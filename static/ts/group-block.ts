import {Block} from './block.js';
import {WrapperBox} from './wrapper-box.js';
import {Layout} from './layout.js';
import Point = paper.Point;
import {Size} from './size.js';
import Path = paper.Path;
import Group = paper.Group;

export class GroupBlock implements Block {

  private readonly layout: Layout = Layout.HORIZONTAL;
  private blocks: Array<Block> = [];
  private box: WrapperBox;
  private static _point: Point = new Point(0, 0);
  private interBoxPadding: number = 2;
  private blockType:string="Group";

  private _group:Group = new Group();
  getGroup(): Group {
    return this._group;
  }


  constructor(layout: Layout) {
    this.layout = layout;
    this.box = WrapperBox.fromTopLeft(GroupBlock._point, new Size(0, 0));
  }

  getType():string {
    return this.blockType;
  }

  addBlock(block: Block) {
    this.blocks.push(block);
    this._updateBox(false);
  }

  getLayout(): Layout {
    return this.layout;
  }

  getBlocks(): Array<Block> {
    return this.blocks;
  }


  draw(): void {
    this._updateBox(true);
    this.blocks.forEach((block) => {
      block.draw();
      this._group.addChild(block.getGroup());
    });
  }

  getBox(): WrapperBox {
    return this.box;
  }

  isDirty(): boolean {
    return false;
  }

  setCenterPosition(center: paper.Point): void {
    this.box = WrapperBox.fromCenter(center, this.box.getSize());
    this._updateBox(false);
  }


  setTopLeftPosition(topLeft: paper.Point): void {
    this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
    this._updateBox(false);
  }

  private _updateBox(align:boolean) {
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
    if(align) {
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
              console.log("Group block:: type: "+block.getType() +"  block.width:" + block.getBox().getSize().getWidth() + "  box.width:" + width);
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