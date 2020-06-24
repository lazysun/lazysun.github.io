/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
var Path = paper.Path;
// import project = paper.Project;
var Point = paper.Point;
var Group = paper.Group;
export class SelectionMode {
    constructor() {
        this.selectedPath = null;
        this.selectedRect = null;
        this.selectionPoint = null;
        this.selectionRectangle = null;
        this.selectionGroup = null;
    }
    onMouseDown(state, event) {
        // @ts-ignore
        let downPoint = event.point;
        // @ts-ignore
        let result = project.hitTest(downPoint);
        console.log(result);
        if (result) {
            if (this.selectedPath) {
                this.selectedPath.selected = false;
            }
            result.item.selected = true;
            this.selectedPath = result.item;
        }
        else {
            if (this.selectedPath) {
                this.selectedPath.selected = false;
                this.selectedPath = null;
            }
            this.selectionPoint = downPoint;
        }
    }
    onMouseDrag(state, event) {
        // @ts-ignore
        let dragPoint = event.point;
        if (this.selectedPath) {
            this.selectedPath.position = dragPoint;
            return;
        }
        else if (this.selectionPoint) {
            if (this.selectionRectangle) {
                this.selectionRectangle.remove();
            }
            let x = Math.min(dragPoint.x, this.selectionPoint.x);
            let y = Math.min(dragPoint.y, this.selectionPoint.y);
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
    onMouseUp(state, event) {
        // @ts-ignore
        let upPoint = event.point;
        this.selectionPoint = null;
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
            selectedGroup.position = new Point(20, 20);
            this.selectionRectangle.remove();
            this.selectionRectangle = null;
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
        }
    }
    onKeyEscape(state, event) {
    }
    onKeyTab(state, event) {
    }
    onModeChanged(state, mode) {
    }
}
