import AssistantMode = Assistant.AssistantMode;
import PathItem = paper.PathItem;
import Point = paper.Point;
import Path = paper.Path;
import Color = paper.Color;
import Event = paper.Event;
import {Context} from '../context';
import Rectangle = paper.Rectangle;
import Group = paper.Group;
import Item = paper.Item;

export class SlicerMode implements AssistantMode {

  private static _pathToBeSliced: Group[] = [];
  private _startingPoint: Point | null = null;
  private _slicerPath: Path | null = null;
  private _defaultStrokeWidth = 1;
  private _context: Context;

  constructor(context: Context) {
    this._context = context;
  }


  public static RegisterItem(group: Group) {
    SlicerMode._pathToBeSliced.push(group);
  }


  onKeyDelete(state: Assistant.State, event: paper.Event): void {

  }

  onKeyDown(state: Assistant.State, event: paper.Event): void {
  }

  onKeyEscape(state: Assistant.State, event: paper.Event): void {
  }

  onKeyTab(state: Assistant.State, event: paper.Event): void {
  }

  onModeChanged(state: Assistant.State, mode: string): void {
  }

  onMouseDown(state: Assistant.State, event: paper.Event): void {
    // // @ts-ignore
    // this._startingPoint = event.point;
  }

  onMouseDrag(state: Assistant.State, event: paper.Event): void {
    if (this._startingPoint) {
      this._drawSlicer(event);
    } else {
      // @ts-ignore
      this._startingPoint = event.point;
      this._drawSlicer(event);
    }

  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
    if (this._slicerPath) {
      this._slicerPath.remove();
      this._slicerPath = null;
      // console.log(this._slicerPath.)
    }

    if (this._startingPoint) {
      let lineNumber: number = 0;
      let startPoint = this._startingPoint;
      this._startingPoint = null;
      //@ts-ignore
      let endPoint = event.point;
      let vector = startPoint.subtract(endPoint);
      let invector = endPoint.subtract(startPoint);
      // console.log(" --- angle -- : " + (vector.angle > 0 ?vector.angle : invector.angle )) ;
      // console.log(" --- angle 360 -- : " + this.to360(vector.angle)) ;
      let angle = (vector.angle > 0 ? vector.angle : invector.angle)
      if (Math.abs(angle) <= 30 || Math.abs(angle) >= 150) {
        lineNumber = 0;
        // console.log("horizontal")
      } else if (angle < 150 && angle > 125) {
        lineNumber = 1;
        // console.log("1 clock")
      } else if (angle < 110 && angle > 75) {
        // console.log("vertical")
        lineNumber = 2;
      } else {
        // console.log("11 clock");
        lineNumber = 3
      }
      this._slice(lineNumber);

    }

  }


  toLine(lineNumber: number, rect: Rectangle) {
    let shift: number = 10;
    let startPoint = new Point(rect.left, rect.top + rect.height / 2);
    let endPoint = new Point(rect.right, rect.top + rect.height / 2);
    let animatePos = (point: Point) => {
      if (point.y < startPoint.y) {
        return new Point(point.x, point.y - shift);
      } else {
        return new Point(point.x, point.y + shift);
      }
    };
    if (lineNumber == 1) {
      startPoint = new Point(rect.right, rect.top);
      endPoint = new Point(rect.left, rect.bottom);

      animatePos = (point: Point) => {
        let m = ((startPoint.y - endPoint.y)/(startPoint.x - endPoint.x));
        let c = startPoint.y - startPoint.x*m;
        let res = point.y - point.x*m -c;
        if (res < 0) {
          return new Point(point.x - shift, point.y -shift);
        } else {
          return new Point(point.x + shift, point.y + shift);
        }
      };

    } else if (lineNumber == 2) {
      startPoint = new Point(rect.left + rect.width / 2, rect.top);
      endPoint = new Point(rect.left + rect.width / 2, rect.bottom);
      animatePos = (point: Point) => {
        if (point.x < startPoint.x) {
          return new Point(point.x - shift, point.y);
        } else {
          return new Point(point.x + shift, point.y);
        }
      };
    } else if (lineNumber == 3) {
      startPoint = new Point(rect.left, rect.top);
      endPoint = new Point(rect.right, rect.bottom);
      animatePos = (point: Point) => {
        let m = ((startPoint.y - endPoint.y)/(startPoint.x - endPoint.x));
        let c = startPoint.y - startPoint.x*m;
        let res = point.y - point.x*m -c;
        if (res < 0) {
          return new Point(point.x + shift, point.y -shift);
        } else {
          return new Point(point.x - shift, point.y + shift);
        }
      };
    }
    let path: Path.Line = new Path.Line(startPoint, endPoint);
    path.data.animatePos = animatePos;
    return path;
  }

  to360(angle: number) {
    if (angle < 0) {
      return 360 + angle;
    }
    return angle;
  }

  _slice(lineNumber: number) {

    if (SlicerMode._pathToBeSliced.length <= 0) return;


    let rect = SlicerMode._pathToBeSliced[0].bounds; //  group bounds instead of pizza
    let sliceLine = this.toLine(lineNumber, rect);

    let groupChild: Item [] = [];
    SlicerMode._pathToBeSliced[0].children.forEach((item) => {
      groupChild.push(item);
    });


    groupChild.forEach((item: Item) => {
      // let pizza = SlicerMode._pathToBeSliced[0].children[0] as PathItem;
      if (item.data.member) {
        let pizza: PathItem = item as PathItem;
        let intersections = sliceLine.getIntersections(pizza);
        let pieces = [];
        for (let i = 0; i < intersections.length; i++) {
          let location = pizza.getNearestLocation(intersections[i].point);
          // @ts-ignore
          let p = pizza.splitAt(location);
          // p.strokeColor = i==0?'red':'green';
          // p.fillColor = i==0?'blue':'yellow';
          p.onMouseDown = () => {
            p.selected = p.selected ? false : true;
            // @ts-ignore
            $(document).trigger("sliced-selection");


            if(p.selected) {
              p.data.fillColor = p.fillColor;
              p.fillColor  = new Color('#e14436')
              // p.fillColor = new Color({
              //   gradient: {
              //     stops: [['#f8cece', 0.05], ['#e14436', 0.2], ['#e7a09a', 1]],
              //     radial: true
              //   },
              //   origin: p.position,
              //   destination: p.bounds.rightCenter
              // });
            }else {
              p.fillColor = p.data.fillColor;
            }
          };
          p.onMouseDrag = (event: Event) => {
            if (p.selected) {
              // @ts-ignore
              p.position = event.point;
            }
          };
          p.data.member = true;
          pieces.push(p);

          // console.log(" ------ final post : " + finalPosition);
          // currentState.circularFocus.tween(
          //     { 'bounds.x': '-=25','bounds.y': '-=25','bounds.width': '+=50', 'bounds.height': '+=50' },
          //     250
          // );
          // p.tween(
          //     // { scaling: 0.1, position:new Point(0,0)},
          //     {position: pos},
          //     // // { scaling: 1, position:finalPos },
          //     {position: pos},
          //     {duration: 1500}
          // ).then(() => {
          //   // expressionGroup.applyMatrix = true;
          // });
        }

        //pieces[pieces.length - 1].position.x += Math.floor((Math.random() * 100) + 1);

        pieces.forEach((p) => {
          // drawPoint(p.firstSegment.point, 'green');
          // drawPoint(p.lastSegment.point);
          let line = new Path.Line(p.firstSegment.point, p.lastSegment.point);
          line.strokeColor = new Color('black');
          p.join(line);
          let pos = p.position;
          let finalPosition = sliceLine.data.animatePos(pos);
          p.tween(
              // { scaling: 0.1, position:new Point(0,0)},
              {position: pos},
              // // { scaling: 1, position:finalPos },
              {position: finalPosition},
              {duration: 500}
          ).then(() => {
            // expressionGroup.applyMatrix = true;
          });
          //  p.lastSegment.clearHandles();
          //  p.firstSegment.clearHandles();
          // p.closePath();
          //  p.closed = true;
          //  p.position.x += Math.floor((Math.random() * 100) + 1)

        });
      }
    });
    console.log(" Total Slices :: " + SlicerMode._pathToBeSliced[0].parent.children.length);
    // @ts-ignore
    $(document).trigger("sliced");
  }

  _drawSlicer(event: Event) {
    let startingPoint = this._startingPoint;

    //@ts-ignore
    let endingPoint = event.point;

    if (startingPoint) {
      if (this._slicerPath) {
        this._slicerPath.removeSegments();
        this._slicerPath.add(startingPoint);
        this._slicerPath.add(endingPoint);
      } else {
        let path = new Path.Line(startingPoint, endingPoint);
        path.strokeColor = new Color('red');
        path.strokeWidth = this._defaultStrokeWidth;
        this._slicerPath = path;
      }
    }
  }
}