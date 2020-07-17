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
import Rectangle = paper.Path.Rectangle;
import Size = paper.Size;
import {Context} from '../context.js';

export class SelectionMode implements AssistantMode {

  selectedPath: Item | null = null;
  selectedRect: Path | null = null;
  selectionPoint: Point | null = null;
  selectionRectangle: Path | null = null;
  selectionGroup: Group | null = null;
  selectionRectMode :boolean = false;
  selectionRectGroup:Group|null = null;
  private _context:Context;
  private _selectedPaths:Item[] = [];

  constructor(context:Context) {
    this._context = context;
  }

  onMouseDown(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let downPoint = event.point;

    let isPointInsideSelection = this._isPointInsideSelectionRect(downPoint);
    let selectedItem = this._isPointOnPath(downPoint);

    if(isPointInsideSelection && selectedItem != null) {
      // case where path is inside the selected rectangle
      this.selectionRectMode = true;
      this._clearAndSetSelectedPath(null);
      this.selectionPoint = null;
    }else if(isPointInsideSelection) {
      // move the selection triangle on drag
      this.selectionRectMode = true;
      this._clearAndSetSelectedPath(null);
      this.selectionPoint = null;
    }else {
      // mouse down is not inside the selection rectangle
      // therefore clear the selection group
      this.selectionRectMode = false;
      this._clearSelectionGroup();
      this._clearAndSetSelectedPath(selectedItem);
      if(selectedItem == null) {
        this.selectionPoint = downPoint;
      }
    }
  }

  onMouseDrag(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let dragPoint = event.point;
    if (this.selectedPath) {
      this.selectedPath.position = dragPoint;
    } else if (this.selectionPoint) {
        this._resetSelectionRect(this.selectionPoint, dragPoint, false);
    } else if(this.selectionRectMode){
      if(this.selectionGroup) {
        this.selectionGroup.position = dragPoint;
        this._boundSelectionRect();
      }
    }
  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let upPoint = event.point;

    this.selectionPoint = null;
    if(this.selectionRectMode) {
      this._addEventHandlerToSelectionRectangle();
      return
    }
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
      if (selectedGroup.children.length > 0) {

        // this._addEventHandlerToSelectedGroup(selectedGroup);
        this.selectionGroup = selectedGroup;
        this._boundSelectionRect();
        this._addEventHandlerToSelectionRectangle();
      }else {
        selectedGroup.remove();
      }
    }
  }

  // @ts-ignore
  private _addEventHandlerToSelectedGroup(selectedGroup: Group) {
    // @ts-ignore
    selectedGroup.onMouseEnter = function () {
      // @ts-ignore
      view.element.style.cursor = 'all-scroll';
    };

    // @ts-ignore
    selectedGroup.onMouseLeave = function () {
      // @ts-ignore
      view.element.style.cursor = 'default';
    };
  }

  // @ts-ignore
  private _addEventHandlerToSelectionRectangle() {
    if(this.selectionRectangle) {

      this.selectionRectangle.onMouseEnter = function () {
        // @ts-ignore
        view.element.style.cursor = 'all-scroll';
      };

      this.selectionRectangle.onMouseLeave = function () {
        // @ts-ignore
        view.element.style.cursor = 'default';
      };
    }
  }

  private _boundSelectionRect() {
    if(this.selectionGroup) {
      let boundingRectangle = this.selectionGroup.bounds;
      let pointTopLeft = new Point(boundingRectangle.left, boundingRectangle.top);
      let pointBottomRight = new Point(boundingRectangle.right, boundingRectangle.bottom);
      this._resetSelectionRect(pointTopLeft, pointBottomRight, true);
    }
  }

  private _resetSelectionRect(startingPoint:Point , endPoint:Point, pad:boolean) {
   this._removeSelectionRectangle();
    let x = Math.min(startingPoint.x, endPoint.x);
    let y = Math.min(startingPoint.y, endPoint.y)
    let mx = Math.max(startingPoint.x, endPoint.x);
    let my = Math.max(startingPoint.y, endPoint.y);
    if(pad) {
      let padding: number = Defaults.selectionRectanglePadding;
      // @ts-ignore
      let bounds = view.bounds;

      x = x - padding;
      if(x < bounds.left) {
        x = bounds.left
      }
      y = y - padding;
      if(y < bounds.top) {
        y= bounds.top;
      }
      mx = mx + padding;
      if(mx > bounds.right) {
        mx = bounds.right;
      }
      my = my + padding;
      if(my > bounds.bottom) {
          my = bounds.bottom;
      }
    }
    this.selectionRectangle = new Path.Rectangle({
      point: [x, y],
      size: [mx - x, my - y],
      strokeColor: Defaults.lightGreyColor,
      dashArray: [4, 10],
      strokeWidth: Defaults.selectionRectangleStrokeWidth,
      strokeCap: 'round',
      // @ts-ignore
      fillColor: new Color('rgba(255, 255, 0, 0.00001)')
    });
    this.selectionRectGroup = new Group();
    this.selectionRectGroup.addChild(this.selectionRectangle);
    if(pad) {
      // @ts-ignore
      // this.selectionRectangle.bounds.selected = true;
      // @ts-ignore
      this._addHandles(this.selectionRectangle.bounds);
    }
    this.selectionRectangle.name = 'selectionRectangle';
  }



  // @ts-ignore
  private _addHandles(rect:Rectangle):void {
    // @ts-ignore
    let handles = [rect.topLeft, rect.topRight, rect.topCenter,rect.bottomLeft, rect.bottomCenter, rect.bottomRight, rect.leftCenter, rect.rightCenter];
    // @ts-ignore
    const selectionRectangle = this.selectionRectangle;
    const selectionRectGroup = this.selectionRectGroup;
    const selectionGroup = this.selectionGroup;
    handles.forEach(function(midpoint) {
      // @ts-ignore
      let handle = new Path.Rectangle(midpoint.subtract(5), new Size(10,10));
      // @ts-ignore
      if(selectionRectGroup) {
        selectionRectGroup.addChild(handle);
      }
      const midpointt = midpoint;
      // @ts-ignore
      handle.onMouseDrag = function (event) {
        // @ts-ignore
        selectionRectGroup.scale(3,1);


        // @ts-ignore
        selectionGroup.scale(3,1);
        // @ts-ignore

      };
      // @ts-ignore
      handle.fillColor = Defaults.lightGreyColor
    });
  }



  private _isPointInsideSelectionRect(point: Point): boolean {
    if (this.selectionRectangle == null ||
        this.selectionRectangle == undefined) return false;
    return this.selectionRectangle.contains(point);
  }

  private _isPointOnPath(point:Point): Item|null {
    // @ts-ignore
    let result = project.hitTest(point);
    return result? result.item:null;
  }

  private _clearAndSetSelectedPath(selectedItem: Item|null):void {

    if(!this._context.getSettings().getSelectionConfig().isMultiSelectionEnabled()) {
      if (this.selectedPath) {
        console.log("should not get called  ----- 1");
        this.selectedPath.selected = false;

      }
    }else {
      console.log("this path executed --");
      if (this.selectedPath) {
        this._selectedPaths.push(this.selectedPath)
      }
    }
    this.selectedPath = selectedItem? selectedItem: null;
    if(this.selectedPath) {
      this.selectedPath.selected = true;
    }
  }

  private _clearSelectionGroup():void {
    if(this.selectionGroup) {
      let kids = this.selectionGroup.children;
      let removedItems : Item[] = [];
      let itemsToBeRemoved : Item[] = [];
      let count:number = 0
      kids.forEach(function (value, index) {
        itemsToBeRemoved.push(value);
      });
      itemsToBeRemoved.forEach(function (value, index) {
          removedItems.push(value);
          count++;
          value.remove();
      });
      removedItems.forEach(function (value, index) {
        console.log("should not get called  ----- 2");
        value.selected = false;
        // @ts-ignore
        project.activeLayer.addChild(value);
      });
      this.selectionGroup.remove();
      this.selectionGroup = null;
    }
   this._removeSelectionRectangle();
  }

  private _removeSelectionRectangle():void {
    if (this.selectionRectangle) {
      this.selectionRectangle.remove();
      this.selectionRectangle = null;
    }
    if(this.selectionRectGroup) {
      this.selectionRectGroup.remove();
      this.selectionRectGroup = null;
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
      this._selectedPaths.forEach((item)=>{
        console.log("should not get called  ----- 3");
        item.selected = false;
      });
      this._selectedPaths = []
    }
  }

  onKeyEscape(state: Assistant.State, event: paper.Event): void {
  }

  onKeyTab(state: Assistant.State, event: paper.Event): void {
  }

  onModeChanged(state: Assistant.State, mode: string): void {
  }


}