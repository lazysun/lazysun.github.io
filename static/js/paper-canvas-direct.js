paper.install(window);
window.onload = function() {

  // constants
  var defaultStrokeColor = '#f8bb0c';
  var defaultStrokeWidth = 7;
  var redStrokeColor = '#e14436';
  var blueStrokeColor = '#2f5284';
  var shapeStrokeWidth = 20;
  var defaultCircleRadius = 80;

  // Setup directly from canvas id:
  paper.setup('myCanvas');
  // Create a simple drawing tool:
  var tool = new Tool();
  var path;
  var selectedItem;

  var textItem = new PointText({
    content: 'Click and drag to drdsaw a line.',
    point: new Point(20, 30),
    fillColor: 'black',
  });

  tool.onMouseDown = function(event) {
    // If we produced a path before, deselect it:
    if (path) {
      path.selected = false;
    }

    var result = project.hitTest(event.point);
    console.log(result);
    if(result) {
      if(selectedItem) {
        selectedItem.selected = false;
      }
      result.item.selected = true;
      selectedItem = result.item;
      return;
    }else {
      if(selectedItem) {
        selectedItem.selected = false;
        selectedItem = null;
      }
    }
    // if(event.currentTarget) {
    //   console.log("current target");
    //   console.log(event.currentTarget);
    //   console.log(event.target);
    //   event.currentTarget.selected = true;
    // }

    // Create a new path and set its stroke color to black:
    path = new Path({
      segments: [event.point],
      strokeColor: defaultStrokeColor,
      strokeWidth: defaultStrokeWidth,
      // Select the path, so we can see its segment points:
      fullySelected: false
    });
  }

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
  tool.onMouseDrag = function(event) {
    if(selectedItem) {
      selectedItem.position = event.point;
      return;
    }
    if(path) {
      path.add(event.point);
      // Update the content of the text item to show how many
      // segments it has:
      textItem.content = 'Segment count: ' + path.segments.length;
    }
  }

// When the mouse is released, we simplify the path:
  tool.onMouseUp = function(event) {
    if(selectedItem) {
      selectedItem.selected = false;
    }
    var segmentCount = path.segments.length;

    // When the mouse is released, simplify it:

    path.simplify(10);
    console.log(path.hasHandles());
    if(path.hasHandles()) {
      console.log(path.segments);
    }
// 	path.smooth('geometric');
// 	path.flatten(0.25);

    // Select the path, so we can see its segments:
    path.fullySelected = false;

    var newSegmentCount = path.segments.length;
    var difference = segmentCount - newSegmentCount;
    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
  }

  $( ".searchButton" ).click(function() {
    var path = new Path.Circle({
      center: view.center,
      radius: 60,
      strokeColor: '#333333',
      strokeWidth: 7,
      strokeColor: 'black'
    });
  });

  $( ".btn-red" ).click(function() {
    var path = new Path.Circle({
      center: view.center,
      radius: defaultCircleRadius,
      strokeColor: redStrokeColor,
      strokeWidth: shapeStrokeWidth
    });
  });

  $( ".btn-yellow" ).click(function() {
    console.log("Yellow button clicked")
    var x = view.center.x;
    var y = view.center.y;
    var rectangle = new Path.Rectangle({
      from: [x - defaultCircleRadius, y - defaultCircleRadius],
      to: [x+defaultCircleRadius, y+defaultCircleRadius],
      strokeColor: defaultStrokeColor,
      strokeWidth: shapeStrokeWidth
    });
  });

  $( ".btn-blue" ).click(function() {
    console.log("blue button clicked")
    var x = view.center.x;
    var y = view.center.y;

    // Create a triangle shaped path
    var triangle = new Path.RegularPolygon(new Point(x, y), 3, 100);
    triangle.strokeColor = blueStrokeColor;
    triangle.strokeWidth = shapeStrokeWidth;

  });

}