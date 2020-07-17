/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
var Path = paper.Path;
// import project = paper.Project;
var Point = paper.Point;
import { Defaults } from '../defaults.js';
var Group = paper.Group;
var Size = paper.Size;
export class SelectionMode {
    constructor(context) {
        this.selectedPath = null;
        this.selectedRect = null;
        this.selectionPoint = null;
        this.selectionRectangle = null;
        this.selectionGroup = null;
        this.selectionRectMode = false;
        this.selectionRectGroup = null;
        this._selectedPaths = [];
        this._context = context;
    }
    onMouseDown(state, event) {
        // @ts-ignore
        let downPoint = event.point;
        let isPointInsideSelection = this._isPointInsideSelectionRect(downPoint);
        let selectedItem = this._isPointOnPath(downPoint);
        if (isPointInsideSelection && selectedItem != null) {
            // case where path is inside the selected rectangle
            this.selectionRectMode = true;
            this._clearAndSetSelectedPath(null);
            this.selectionPoint = null;
        }
        else if (isPointInsideSelection) {
            // move the selection triangle on drag
            this.selectionRectMode = true;
            this._clearAndSetSelectedPath(null);
            this.selectionPoint = null;
        }
        else {
            // mouse down is not inside the selection rectangle
            // therefore clear the selection group
            this.selectionRectMode = false;
            this._clearSelectionGroup();
            this._clearAndSetSelectedPath(selectedItem);
            if (selectedItem == null) {
                this.selectionPoint = downPoint;
            }
        }
    }
    onMouseDrag(state, event) {
        // @ts-ignore
        let dragPoint = event.point;
        if (this.selectedPath) {
            this.selectedPath.position = dragPoint;
        }
        else if (this.selectionPoint) {
            this._resetSelectionRect(this.selectionPoint, dragPoint, false);
        }
        else if (this.selectionRectMode) {
            if (this.selectionGroup) {
                this.selectionGroup.position = dragPoint;
                this._boundSelectionRect();
            }
        }
    }
    onMouseUp(state, event) {
        // @ts-ignore
        let upPoint = event.point;
        this.selectionPoint = null;
        if (this.selectionRectMode) {
            this._addEventHandlerToSelectionRectangle();
            return;
        }
        if (this.selectionRectangle) {
            let selectedList = new Array();
            const selectionRectangle = this.selectionRectangle;
            // @ts-ignore
            project.activeLayer.children.forEach((item, index) => {
                if (item && item.getClassName() == 'Path' && item.name != 'selectionRectangle') {
                    // @ts-ignore
                    if (item.isInside(selectionRectangle.getBounds())) {
                        selectedList.push(item);
                        item.selected = true;
                    }
                    else if (item.intersects(selectionRectangle)) {
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
            }
            else {
                selectedGroup.remove();
            }
        }
    }
    // @ts-ignore
    _addEventHandlerToSelectedGroup(selectedGroup) {
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
    _addEventHandlerToSelectionRectangle() {
        if (this.selectionRectangle) {
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
    _boundSelectionRect() {
        if (this.selectionGroup) {
            let boundingRectangle = this.selectionGroup.bounds;
            let pointTopLeft = new Point(boundingRectangle.left, boundingRectangle.top);
            let pointBottomRight = new Point(boundingRectangle.right, boundingRectangle.bottom);
            this._resetSelectionRect(pointTopLeft, pointBottomRight, true);
        }
    }
    _resetSelectionRect(startingPoint, endPoint, pad) {
        this._removeSelectionRectangle();
        let x = Math.min(startingPoint.x, endPoint.x);
        let y = Math.min(startingPoint.y, endPoint.y);
        let mx = Math.max(startingPoint.x, endPoint.x);
        let my = Math.max(startingPoint.y, endPoint.y);
        if (pad) {
            let padding = Defaults.selectionRectanglePadding;
            // @ts-ignore
            let bounds = view.bounds;
            x = x - padding;
            if (x < bounds.left) {
                x = bounds.left;
            }
            y = y - padding;
            if (y < bounds.top) {
                y = bounds.top;
            }
            mx = mx + padding;
            if (mx > bounds.right) {
                mx = bounds.right;
            }
            my = my + padding;
            if (my > bounds.bottom) {
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
        if (pad) {
            // @ts-ignore
            // this.selectionRectangle.bounds.selected = true;
            // @ts-ignore
            this._addHandles(this.selectionRectangle.bounds);
        }
        this.selectionRectangle.name = 'selectionRectangle';
    }
    // @ts-ignore
    _addHandles(rect) {
        // @ts-ignore
        let handles = [rect.topLeft, rect.topRight, rect.topCenter, rect.bottomLeft, rect.bottomCenter, rect.bottomRight, rect.leftCenter, rect.rightCenter];
        // @ts-ignore
        const selectionRectangle = this.selectionRectangle;
        const selectionRectGroup = this.selectionRectGroup;
        const selectionGroup = this.selectionGroup;
        handles.forEach(function (midpoint) {
            // @ts-ignore
            let handle = new Path.Rectangle(midpoint.subtract(5), new Size(10, 10));
            // @ts-ignore
            if (selectionRectGroup) {
                selectionRectGroup.addChild(handle);
            }
            const midpointt = midpoint;
            // @ts-ignore
            handle.onMouseDrag = function (event) {
                // @ts-ignore
                selectionRectGroup.scale(3, 1);
                // @ts-ignore
                selectionGroup.scale(3, 1);
                // @ts-ignore
            };
            // @ts-ignore
            handle.fillColor = Defaults.lightGreyColor;
        });
    }
    _isPointInsideSelectionRect(point) {
        if (this.selectionRectangle == null ||
            this.selectionRectangle == undefined)
            return false;
        return this.selectionRectangle.contains(point);
    }
    _isPointOnPath(point) {
        // @ts-ignore
        let result = project.hitTest(point);
        return result ? result.item : null;
    }
    _clearAndSetSelectedPath(selectedItem) {
        if (!this._context.getSettings().getSelectionConfig().isMultiSelectionEnabled()) {
            if (this.selectedPath) {
                console.log("should not get called  ----- 1");
                this.selectedPath.selected = false;
            }
        }
        else {
            console.log("this path executed --");
            if (this.selectedPath) {
                this._selectedPaths.push(this.selectedPath);
            }
        }
        this.selectedPath = selectedItem ? selectedItem : null;
        if (this.selectedPath) {
            this.selectedPath.selected = true;
        }
    }
    _clearSelectionGroup() {
        if (this.selectionGroup) {
            let kids = this.selectionGroup.children;
            let removedItems = [];
            let itemsToBeRemoved = [];
            let count = 0;
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
    _removeSelectionRectangle() {
        if (this.selectionRectangle) {
            this.selectionRectangle.remove();
            this.selectionRectangle = null;
        }
        if (this.selectionRectGroup) {
            this.selectionRectGroup.remove();
            this.selectionRectGroup = null;
        }
    }
    onKeyDelete(state, event) {
    }
    onKeyDown(state, event) {
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
        }
        else if (keyDown == 'escape') {
            if (this.selectedPath) {
                this.selectedPath.selected = false;
                this.selectedPath = null;
            }
            this._selectedPaths.forEach((item) => {
                console.log("should not get called  ----- 3");
                item.selected = false;
            });
            this._selectedPaths = [];
        }
    }
    onKeyEscape(state, event) {
    }
    onKeyTab(state, event) {
    }
    onModeChanged(state, mode) {
    }
}
