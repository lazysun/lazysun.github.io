/// <reference path="paper.d.ts" />
import {WrapperBox} from './wrapper-box.js';
import Point = paper.Point;
import Path = paper.Path;
import PointText = paper.PointText;
import Color = paper.Color;
import Rectangle = paper.Rectangle;
import {Size} from './size';
import {Block} from './block.js';
import Group = paper.Group;

export class TextBlock implements Block{

  blockType:string = "Drawing"; // Drawing // Image // Text
  box:WrapperBox = WrapperBox.defaultBox;
  text:string = "";
  padding:number = 10;
  fontSize:string = '100px';
  private static  _point:Point = new Point(0,0);
  dirty:boolean = false;
  private _group:Group = new Group();
  getGroup(): Group {
    return this._group;
  }

  public static CreateTextBlock(text:string, fontSize?:string):Block {
      let block:TextBlock = new TextBlock();
      block.blockType = 'Text';
      block.text = text;
      if(fontSize) {
        block.fontSize = fontSize;
      }
      block.box = TextBlock.computeTextBlockDimension(text, block.fontSize);
      return  block;
  }

  getType():string {
    return this.blockType;
  }


  public setText(text:string):void {
    this.text = text;
    this.box = TextBlock.computeTextBlockDimension(text, this.fontSize);
  }

  public setTopLeftPosition(topLeft:Point) {
    this.box = WrapperBox.fromTopLeft(topLeft, this.box.getSize());
  }

  public setCenterPosition(center:Point) {
    this.box = WrapperBox.fromCenter(center, this.box.getSize());
  }

  private static computeTextBlockDimension(text:string,fontSize:string):WrapperBox {
    let pointText = new PointText(TextBlock._point);
    pointText.justification  = 'center';
    pointText.fillColor = new Color('#2f5284');
    pointText.strokeColor = new Color('#2f5284');
    pointText.fontSize = fontSize;
    pointText.content = text;
    pointText.bounds.topLeft = TextBlock._point;
    let wrapperBox:WrapperBox =  WrapperBox._convertRect2Box(pointText.bounds);
    pointText.remove();
    return wrapperBox;
  }

  public draw() {
    if(this.isDirty()) {
      console.log("Not drawing the dirty text block with text : " + this.text);
      return;
    }
    let pointText = new PointText(this.box.getCenter());
    pointText.justification  = 'center';
    pointText.fillColor =  new Color('#2f5284');
    pointText.fontSize = this.fontSize;
    pointText.content = this.text;
    pointText.bounds.topLeft = this.box.getTopLeft();
    this._group.addChild(pointText);
  }

  isDirty(): boolean {
    return this.dirty;
  }

  getBox(): WrapperBox {
    return this.box;
  }






}