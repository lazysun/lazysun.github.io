/// <reference path="paper.d.ts" />
import Point = paper.Point;
import {WrapperBox} from './wrapper-box.js';
import Group = paper.Group;

export interface Block {

  setTopLeftPosition(topLeft:Point):void;
  setCenterPosition(center:Point):void;
  isDirty():boolean;
  draw():void;
  getBox():WrapperBox;
  getType():string;
  getGroup():Group;
}