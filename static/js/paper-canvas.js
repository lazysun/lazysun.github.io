var path;

var textItem = new PointText({
  content: 'Click and drag to drsaw a line.',
  point: new Point(20, 30),
  fillColor: 'black',
});

function onMouseDown(event) {
  // If we produced a path before, deselect it:
  if (path) {
    path.selected = false;
  }

  // Create a new path and set its stroke color to black:
  path = new Path({
    segments: [event.point],
    strokeColor: '#333333',
    strokeWidth: 7,
    // Select the path, so we can see its segment points:
    fullySelected: false
  });
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
  path.add(event.point);

  // Update the content of the text item to show how many
  // segments it has:
  textItem.content = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
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