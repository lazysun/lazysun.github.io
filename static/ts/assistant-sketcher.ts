/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />
/// <reference path="./defaults.ts" />
import {Commands} from './commands.js';
import {GeoObjects} from './geo-objects.js';
import Path = paper.Path;
import {Defaults} from './defaults.js';
import Point = paper.Point;

export class AssistantSketcher {


  executeCommand(command: string): void {
    console.log("I received the command :" + command);
    let com: Commands = this._findCommand(command);
    let obj: GeoObjects = this._findObject(command);
    switch (com) {
      case Commands.DRAW:
        return this._draw(obj);
    }

  }

  private _draw(obj: GeoObjects) {
    switch (obj) {
      case GeoObjects.CIRCLE:
        let circle: Path = new Path.Circle({
          //@ts-ignore
          center: view.center,
          radius: Defaults.defaultCircleRadius,
          strokeColor: Defaults.redStrokeColor,
          strokeWidth: Defaults.shapeStrokeWidth
        });
        circle.bounds.selected = true;
        break;
      case GeoObjects.RECTANGLE:
        //@ts-ignore
        let center: Point = view.center;
        let x = center.x;
        let y = center.y;
        let rect: Path = new Path.Rectangle({
          from: [x - Defaults.defaultCircleRadius, y - Defaults.defaultCircleRadius],
          to: [x + Defaults.defaultCircleRadius, y + Defaults.defaultCircleRadius],
          strokeColor: Defaults.defaultStrokeColor,
          strokeWidth: Defaults.shapeStrokeWidth
        });

        break;
      default:
        console.log("Don't draw anything")

    }
  }

  private _findCommand(command: string) {
    if (command.includes('draw') || command.includes('create') || command.includes('add')) {
      return Commands.DRAW;
    } else if (command.includes('delete') || command.includes('remove') || command.includes('clear')) {
      return Commands.DELETE;
    } else {
      return Commands.DRAW;
    }

  }

  private _findObject(command: string) {
    if (command.includes('circle')) {
      return GeoObjects.CIRCLE;
    } else if (command.includes('triangle')) {
      return GeoObjects.TRIANGLE;
    } else if (command.includes('rectangle')) {
      return GeoObjects.RECTANGLE;
    } else {
      return GeoObjects.CIRCLE;
    }
  }
}