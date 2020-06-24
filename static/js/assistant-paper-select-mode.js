export class SelectMode {
  static selectedPath = null;
  static selectedRect = null;
  static selectionPoint = null;
  static selectionRectangle = null;
  static selectionGroup = null;

  static onMouseDown = function (currentState, event) {
    var result = project.hitTest(event.point);
    console.log(result);
    if (result) {
      if (SelectMode.selectedPath) {
        SelectMode.selectedPath.selected = false;
      }
      result.item.selected = true;
      SelectMode.selectedPath = result.item;

    } else {
      if (SelectMode.selectedPath) {
        SelectMode.selectedPath.selected = false;
        SelectMode.selectedPath = null;
      }
      SelectMode.selectionPoint = event.point;
    }
  }

  static onMouseDrag = function (currentState, event) {
    if (SelectMode.selectedPath) {
      SelectMode.selectedPath.position = event.point;
      return;
    } else if (SelectMode.selectionPoint) {
      if (SelectMode.selectionRectangle) {
        SelectMode.selectionRectangle.remove();
      }

      let x = Math.min(event.point.x, SelectMode.selectionPoint.x);
      let y = Math.min(event.point.y, SelectMode.selectionPoint.y)
      let mx = Math.max(event.point.x, SelectMode.selectionPoint.x);
      let my = Math.max(event.point.y, SelectMode.selectionPoint.y);
      SelectMode.selectionRectangle = new Path.Rectangle({
        point: [x, y],
        size: [mx - x, my - y],
        strokeColor: 'red'
      });
      SelectMode.selectionRectangle.name = 'selectionRectangle';
    }
  }

  static onMouseUp = function (currentState, event) {

    SelectMode.selectionPoint = null;
    if (SelectMode.selectionRectangle) {
      let selectedList =[];
      let count = 0;
      let count2 = 0;
      let count3 = 0;
      let count4 = 0;
      let count5 = 0;
      let counti = 0
      console.log("Current children " +  project.activeLayer.children.length);
      project.activeLayer.children.forEach(function (item, index) {
        // console.log(" debug ++ " + item.getClassName());
        count5++;
        if(item && item.getClassName() == 'Path' && item.name != 'selectionRectangle') {
          count4++;
          // console.log("insiode rec 1 " + item.isInside(SelectMode.selectionRectangle));
          // console.log("insiode rec 2  " + item.isInside(SelectMode.selectionRectangle.getBounds()));
          // console.log("inside rec 3 " + SelectMode.selectionRectangle.contains(item.getBounds()))
          if(SelectMode.selectionRectangle.contains(item.getBounds())) {
              count2++;
          }
          if(item.isInside(SelectMode.selectionRectangle)) {
            count3++;
          }
          if (item.isInside(SelectMode.selectionRectangle.getBounds())) {
            selectedList.push(item);
            item.selected = true;
            count++;
            // console.log("Found inside " + count);
          } else if (item.intersects(SelectMode.selectionRectangle)) {
            selectedList.push(item);
            counti++;
            item.selected = true;
            // console.log("Found intersecting " + counti);
          }
        }
      });
      // console.log("Total found : " + count);
      // console.log("Total found  intersecting : " + counti);
      // console.log("Total found  inside Method2 : " + count2);
      // console.log("Total found  inside Method3 : " + count3);
      console.log("Total children count inside loop : " + count5);
      console.log("Total children count after if cond.  : " + count4);

      let selectedGroup = new Group();
      selectedList.forEach(function (item, index) {
        selectedGroup.addChild(item);
      });

      selectedGroup.position = new Point(20, 20);
      console.log("Current children after group " +  project.activeLayer.children.length);
      // if (selectionGroup.hasChildren()) {
      //   SelectMode.selectionGroup = selectionGroup;
      // } else {
      //   selectionGroup.remove();
      // }
      SelectMode.selectionRectangle.remove();
      SelectMode.selectionRectangle = null;
    }
  }

  static onKeyDown = function (currentState, event) {
    console.log("Select Mode -> onKeyDown " + event.key);
    if (event.key == 'backspace') {
      if (SelectMode.selectedPath) {
        SelectMode.selectedPath.selected = false;
        SelectMode.selectedPath.remove();
        SelectMode.selectedPath = null;
      }
    } else if (event.key == 'escape') {
      if (SelectMode.selectedPath) {
        SelectMode.selectedPath.selected = false;
        SelectMode.selectedPath = null;
      }
    }
  }
}