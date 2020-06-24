export class AssistantPaperUtil {
  constructor() {
    // grid defaults
    this.pointRadius = 1;
    this.pointFillColor = '#2f5284';
    this.interPointDistance = 40;
    this.verticalPadding = 40; // should be at least pointRadius
    this.horizontalPadding = this.pointRadius; // should be at least pointRadius
    this.gridLayer = null;
  }
  computeAligned(initialMargin, pointValue) {
    let alignedValue;
    let n = (pointValue - initialMargin) / this.interPointDistance;
    n = Math.floor(n);
    var diff = pointValue - (initialMargin + n * this.interPointDistance);
    if (diff == 0) {
      alignedValue = pointValue;
    } else if (diff > this.interPointDistance / 2) {
      alignedValue = initialMargin + (n + 1) * this.interPointDistance;
    } else {
      alignedValue = initialMargin + n * this.interPointDistance;
    }
    return alignedValue;
  }

  computeAlignedPoint(rawPoint) {
    let alignedPoint = new Point(0, 0);
    alignedPoint.x = this.computeAligned(
        view.bounds.x + this.horizontalPadding, rawPoint.x);
    alignedPoint.y = this.computeAligned(
        view.bounds.y + this.verticalPadding, rawPoint.y);
    return alignedPoint;
  }




  drawGrid() {
// make the grid
    let currentLayer = project.activeLayer;
    this.gridLayer = new Layer();
    for (let y = view.bounds.y + this.verticalPadding; y < view.bounds.width;
        y = y + this.interPointDistance) {
      for (let x = view.bounds.x + this.horizontalPadding; x < view.bounds.width;
          x = x + this.interPointDistance) {
        let p = new Path.Circle({
          center: new Point(x, y),
          radius: this.pointRadius,
          fillColor: this.pointFillColor
        });
      }
    }
    currentLayer.activate();
  }
}