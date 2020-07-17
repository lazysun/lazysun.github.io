/// <reference path="../paper.d.ts" />
import {WrapperBox} from '../wrapper-box.js';
import Point = paper.Point;
import Path = paper.Path;
import PointText = paper.PointText;
import Color = paper.Color;
import Rectangle = paper.Rectangle;
import {Size} from '../size';
import {Block} from '../block.js';
import Group = paper.Group;


export class FractionalTextBlock implements Block {

  blockType: string = "Drawing"; // Drawing // Image // Text
  box: WrapperBox = WrapperBox.defaultBox;
  n: string = "";
  d: string = "";
  padding: number = 10;
  fontSize: string = '75px';
  private static _point: Point = new Point(0, 0);
  dirty: boolean = false;
  private _group: Group = new Group();
  private static _space = 0;

  private _numerator:number = 0;
  private _denominator:number = 1;

  private _isNumeratorSet:boolean = false;

  public setNumbers(denominator:number, numerator?:number) {
      this._denominator = denominator;
      if(numerator && numerator > 0) {
        this._numerator = numerator;
        this._isNumeratorSet = true;
      } else {
        this._numerator = 0;
        this._isNumeratorSet = false;
      }
  }

  getGroup(): Group {
    return this._group;
  }

  public static CreateTextBlock(numerator: string, denominator: string, fontSize?: string): Block {
    let block: FractionalTextBlock = new FractionalTextBlock();
    block.blockType = 'FractionalText';
    block.n = numerator;
    block.d = denominator;
    if (fontSize) {
      block.fontSize = fontSize;
    }
    block.box = FractionalTextBlock.computeTextBlockDimension(numerator, denominator, block.fontSize);
    return block;
  }

  private static computeTextBlockDimension(numerator:string,denominator:string, fontSize:string):WrapperBox {
    let temp:Group = new Group();
    temp.data.undivided = true;
    temp.data.moveable = true;
    // temp.applyMatrix = false;

    let space:number = FractionalTextBlock._space;

    let numeratorItem = new PointText(FractionalTextBlock._point);
    numeratorItem.justification  = 'center';
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
    line.data.moveable = false
    temp.addChild(line);
    line.bounds.topLeft = new Point(0, rect.bottom+space);


    let denominatorItem = new PointText(new Point(0, rect.bottom + space+space+space));
    denominatorItem.justification  = 'center';
    denominatorItem.fillColor = new Color('#2f5284');
    denominatorItem.strokeColor = new Color('#2f5284');
    denominatorItem.fontSize = fontSize;
    denominatorItem.content = denominator;
    denominatorItem.data.undivided = true;
    denominatorItem.data.moveable = false;
    temp.addChild(denominatorItem);
    denominatorItem.bounds.topLeft = new Point(0, rect.bottom+space+space+space);

    let wrapperBox:WrapperBox =  WrapperBox._convertRect2Box(temp.bounds);
    temp.remove();
    return wrapperBox;
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

  draw(): void {
    this.getGroup().removeChildren();
    if(this.isDirty()) {
      console.log("Not drawing the dirty  fractional text block with text : " );
      return;
    }
    let temp:Group = this._group;
    temp.data.undivided = true;
    temp.data.moveable = true;
    // temp.applyMatrix = false;

    if(this._isNumeratorSet) {
      this.drawUpperLower(temp);
    }else {
      this.drawUpper(temp);
    }

    temp.bounds.topLeft = this.box.getTopLeft();
  }

  private drawUpper(temp: paper.Group) {
    let numeratorItem = new PointText(FractionalTextBlock._point);
    numeratorItem.justification = 'center';
    numeratorItem.fillColor = new Color('#2f5284');
    numeratorItem.strokeColor = new Color('#2f5284');
    numeratorItem.fontSize = this.fontSize;
    numeratorItem.content = this._denominator+'';
    numeratorItem.data.undivided = true;
    numeratorItem.data.moveable = false;

    temp.addChild(numeratorItem);
    numeratorItem.bounds.topLeft = FractionalTextBlock._point;
  }


  private drawUpperLower(temp: paper.Group) {
    let space: number = FractionalTextBlock._space;


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
    line.data.moveable = false
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

  getBox(): WrapperBox {
    return this.box;
  }

  getType(): string {
    return this.blockType;
  }

}