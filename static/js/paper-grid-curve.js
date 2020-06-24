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
  var tempItems = [];

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
  function removeTempItems(item) {
    item.remove();
  }
  function drawHintCurve(path) {
    tempItems.forEach(removeTempItems);
    while (tempItems.length) {
      var item = tempItems.pop();
      item.remove();
    }
    var lengthOfNormalVector = 400;
    var firstOffset = path.length/4;//path.length/3;
    var secondOffset = path.length*2/4;//path.length*2/3;
    var thirdOffset = path.length*3/4;
    var pointAt1stOffset = path.getPointAt(firstOffset);
    var pointAt2ndOffset = path.getPointAt(secondOffset);
    var pointAt3rdOffset = path.getPointAt(thirdOffset);
    var normalAt1stOffset = path.getNormalAt(firstOffset).multiply(lengthOfNormalVector);
    var normalAt2ndOffset = path.getNormalAt(secondOffset).multiply(lengthOfNormalVector);
    var normalAt3rdOffset = path.getNormalAt(thirdOffset).multiply(lengthOfNormalVector);

    // console.log("first normal" + normalAt1stOffset);
    // console.log("second normal" + normalAt2ndOffset);
    var firstLine = new Path({
      segments: [pointAt1stOffset.subtract(normalAt1stOffset), pointAt1stOffset],
      strokeColor: 'red'
    });

    var secondLine =  new Path({
      segments: [pointAt2ndOffset.subtract(normalAt2ndOffset), pointAt2ndOffset],
      strokeColor: 'red'
    });

    var thirdLine =  new Path({
      segments: [pointAt3rdOffset.subtract(normalAt3rdOffset), pointAt3rdOffset],
      strokeColor: 'blue'
    });

    var intersections = firstLine.getIntersections(secondLine);
    if(intersections && intersections.length > 0) {
      // console.log("yes  intersections len vector : ");
      var lenVector = intersections[0].point.subtract(pointAt1stOffset);
      var lenVector2 = intersections[0].point.subtract(pointAt2ndOffset);
      var radiusofHintCircle = Math.max(lenVector.length, lenVector2.length);

      for (var i = 0; i < intersections.length; i++) {
        // console.log("creating cricle len vectot : "+ radiusofHintCircle);
        var intersectionPath = new Path.Circle({
          center: intersections[i].point,
          radius: radiusofHintCircle,
          strokeColor: 'red'
          // parent: intersectionGroup
        });
        intersectionPath.dashArray = [10, 12];
        tempItems.push(intersectionPath);
      }
    }else {
      // console.log("no intersections");
    }
    tempItems.push(firstLine);
    tempItems.push(secondLine);
    tempItems.push(thirdLine);

  }

  tool.onMouseDown = function (event) {
    // can make a new state object too
    currentState.initialRawPoint = event.point;
    currentState.initialAlignedPoint = computeAlignedPoint(currentState.initialRawPoint);
    currentState.path = new Path({
      segments: [currentState.initialRawPoint],
      strokeColor: '#333333',
      strokeWidth: 7,
      // Select the path, so we can see its segment points:
      fullySelected: false
    });
  }

  // While the user drags the mouse, points are added to the path
// at the position of the mouse:
  tool.onMouseDrag = function (event) {
    if(currentState && currentState.path) {
      currentState.path.add(event.point);
      drawHintCurve(currentState.path);

    }
        // updatePath(event.point, false)
  }

// When the mouse is released, we simplify the path:
  tool.onMouseUp = function (event) {
    // updatePath(event.point, true);
    drawHintCurve(currentState.path);
    if(currentState && currentState.path) {
      currentState.path.remove();
    }
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