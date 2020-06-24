/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />

import AssistantMode = Assistant.AssistantMode;
import Path = paper.Path;
// import project = paper.Project;
import Point = paper.Point;
import Event = paper.Event;

import {Defaults} from '../defaults.js';
import Group = paper.Group;
import Item = paper.Item;

export class SelectionMode implements AssistantMode {

  selectedPath: Path | null = null;
  selectedRect: Path | null = null;
  selectionPoint: Point | null = null;
  selectionRectangle: Path | null = null;
  selectionGroup: Group | null = null;

  onMouseDown(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let downPoint = event.point;

    // @ts-ignore
    let result = project.hitTest(downPoint);
    console.log(result);
    if (result) {
      if (this.selectedPath) {
        this.selectedPath!.selected = false;
      }
      result.item.selected = true;
      this.selectedPath = result.item;

    } else {
      if (this.selectedPath) {
        this.selectedPath.selected = false;
        this.selectedPath = null;
      }

      this.selectionPoint = downPoint;
    }
  }


  onMouseDrag(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let dragPoint = event.point;
    if (this.selectedPath) {
      this.selectedPath.position = dragPoint;
      return;
    } else if (this.selectionPoint) {
      if (this.selectionRectangle) {
        this.selectionRectangle.remove();
      }

      let x = Math.min(dragPoint.x, this.selectionPoint.x);
      let y = Math.min(dragPoint.y, this.selectionPoint.y)
      let mx = Math.max(dragPoint.x, this.selectionPoint.x);
      let my = Math.max(dragPoint.y, this.selectionPoint.y);
      this.selectionRectangle = new Path.Rectangle({
        point: [x, y],
        size: [mx - x, my - y],
        strokeColor: 'red'
      });
      this.selectionRectangle.name = 'selectionRectangle';
    }
  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let upPoint = event.point;

    this.selectionPoint = null;
    if (this.selectionRectangle) {
      let selectedList: Item[] = new Array();
      const selectionRectangle = this.selectionRectangle;
      // @ts-ignore
      project.activeLayer.children.forEach((item, index) => {

        if (item && item.getClassName() == 'Path' && item.name != 'selectionRectangle') {
          // @ts-ignore
          if (item.isInside(selectionRectangle.getBounds())) {
            selectedList.push(item);
            item.selected = true;
          } else if (item.intersects(selectionRectangle)) {
            selectedList.push(item);
            item.selected = true;
          }

        }
      });

      let selectedGroup = new Group();
      selectedList.forEach(function (item, index) {
        selectedGroup.addChild(item);
      });

      selectedGroup.position = new Point(20, 20);

      this.selectionRectangle.remove();
      this.selectionRectangle = null;
    }
  }

  onKeyDelete(state: Assistant.State, event: paper.Event): void {

  }

  onKeyDown(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let keyDown = event.key;
    console.log("Select Mode -> onKeyDown " + keyDown);
    // @ts-ignore
    if (keyDown == 'backspace') {
      if (this.selectedPath) {
        this.selectedPath.selected = false;
        this.selectedPath.remove();
        this.selectedPath = null;
      }
    } else if (keyDown == 'escape') {
      if (this.selectedPath) {
        this.selectedPath.selected = false;
        this.selectedPath = null;
      }
    }
  }

  onKeyEscape(state: Assistant.State, event: paper.Event): void {
  }

  onKeyTab(state: Assistant.State, event: paper.Event): void {
  }

  onModeChanged(state: Assistant.State, mode: string): void {
  }


}