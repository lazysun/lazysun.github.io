paper.install(window);
window.onload = function () {

  // constants
  var defaultStrokeColor = '#f8bb0c';
  var defaultStrokeWidth = 7;
  var redStrokeColor = '#e14436';
  var blueStrokeColor = '#2f5284';
  var shapeStrokeWidth = 20;
  var defaultCircleRadius = 80;

  // grid defaults
  var pointRadius = 1;
  var pointFillColor = '#2f5284';
  var interPointDistance = 40;
  var verticalPadding = 40; // should be at least pointRadius
  var horizontalPadding = pointRadius; // should be at least pointRadius

  // features defaults
  var alignToGrids = true;
  var alignTempPoints = false;

  // Setup directly from canvas id:
  paper.setup('myCanvas');
  // Create a simple drawing tool:
  var tool = new Tool();
  var currentState = new Object();
  currentState.path = null;
  currentState.selectedItem = null;
  currentState.initialRawPoint = null;
  currentState.initialAlignedPoint = null;

  var textItem = new PointText({
    content: 'Click and drag to drdsaw a line.',
    point: new Point(20, 30),
    fillColor: 'black',
  });

  function drawGrid() {
    // make the grid
    for (y = view.bounds.y + verticalPadding; y < view.bounds.width;
        y = y + interPointDistance) {
      for (x = view.bounds.x + horizontalPadding; x < view.bounds.width;
          x = x + interPointDistance) {
        p = new Path.Circle({
          center: new Point(x, y),
          radius: pointRadius,
          fillColor: pointFillColor
        });
      }
    }
  }
  
  function computeAlignedPoint(rawPoint) {
    var alignedPoint = new Point(0, 0);
    alignedPoint.x = computeAligned(interPointDistance,
        view.bounds.x + horizontalPadding, rawPoint.x);
    alignedPoint.y = computeAligned(interPointDistance,
        view.bounds.y + verticalPadding, rawPoint.y);
    return alignedPoint;
  }

  function computeAligned(interPointDistance, initialMargin, pointValue) {
    var alignedValue;
    var n = (pointValue - initialMargin) / interPointDistance;
    n = Math.floor(n);
    var diff = pointValue - (initialMargin + n * interPointDistance);
    if (diff == 0) {
      alignedValue = pointValue;
    } else if (diff > interPointDistance / 2) {
      alignedValue = initialMargin + (n + 1) * interPointDistance;
    } else {
      alignedValue = initialMargin + n * interPointDistance;
    }
    return alignedValue;
  }

  function updatePath(rawCurrentPoint, isTerminalPoint) {
    if (currentState.initialRawPoint) {
      var startingPoint = alignToGrids ? currentState.initialAlignedPoint : currentState.initialRawPoint;
      var endingPoint;
      if(isTerminalPoint) {
        endingPoint = alignToGrids ? computeAlignedPoint(
            rawCurrentPoint) : rawCurrentPoint;
      }else {
        endingPoint = alignToGrids && alignTempPoints ? computeAlignedPoint(
            rawCurrentPoint) : rawCurrentPoint;
      }
      if (currentState.path) {
        currentState.path.removeSegments();
        currentState.path.add(startingPoint);
        currentState.path.add(endingPoint);
      } else {
        currentState.path = new Path({
          segments: [startingPoint],
          strokeColor: defaultStrokeColor,
          strokeWidth: defaultStrokeWidth,
          // Select the path, so we can see its segment points:
          fullySelected: false
        });
        currentState.path.add(endingPoint);
      }
    }
  }

  drawGrid();

  tool.onMouseDown = function (event) {
    // can make a new state object too
    currentState.initialRawPoint = event.point;
    currentState.initialAlignedPoint = computeAlignedPoint(currentState.initialRawPoint);
  }

  // While the user drags the mouse, points are added to the path
// at the position of the mouse:
  tool.onMouseDrag = function (event) {
        updatePath(event.point, false)
  }

// When the mouse is released, we simplify the path:
  tool.onMouseUp = function (event) {
    updatePath(event.point, true);
    currentState = new Object();
  }

  $(".searchButton").click(function () {
    var path = new Path.Circle({
      center: view.center,
      radius: 60,
      strokeColor: '#333333',
      strokeWidth: 7,
      strokeColor: 'black'
    });
  });

  $(".btn-red").click(function () {
    var path = new Path.Circle({
      center: view.center,
      radius: defaultCircleRadius,
      strokeColor: redStrokeColor,
      strokeWidth: shapeStrokeWidth
    });
  });

  $(".btn-yellow").click(function () {
    console.log("Yellow button clicked")
    var x = view.center.x;
    var y = view.center.y;
    var rectangle = new Path.Rectangle({
      from: [x - defaultCircleRadius, y - defaultCircleRadius],
      to: [x + defaultCircleRadius, y + defaultCircleRadius],
      strokeColor: defaultStrokeColor,
      strokeWidth: shapeStrokeWidth
    });
  });

  $(".btn-blue").click(function () {
    console.log("blue button clicked")
    var x = view.center.x;
    var y = view.center.y;

    // Create a triangle shaped path
    var triangle = new Path.RegularPolygon(new Point(x, y), 3, 100);
    triangle.strokeColor = blueStrokeColor;
    triangle.strokeWidth = shapeStrokeWidth;

  });

}