/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />
/// <reference path="./defaults.ts" />
import {Commands} from './commands.js';
import {GeoObjects} from './geo-objects.js';
import {Defaults} from './defaults.js';
import {Context} from './context.js';
import {ScreenType} from './screen-type.js';
import {BlockLayer} from './block-layer.js';
import {Block} from './block.js';
import {TextBlock} from './text-block.js';
import {SizeCalculator} from './size-calculator.js';
import {GlobalAlignment} from './global-alignment.js';
import {WrapperBox} from './wrapper-box.js';
import {CommandParser} from './command-parser.js';
import {Command} from './command.js';
import {CommandParam} from './command-param.js';
import {ImageBlock} from './image-block.js';
import {GroupBlock} from './group-block.js';
import {Layout} from './layout.js';
import Path = paper.Path;
import Point = paper.Point;
import Rectangle = paper.Rectangle;
import {Size} from './size.js';
import Group = paper.Group;
import {ExpressionParser} from './expression-parser';
import {Expression} from './expression';
// import Size = paper.Size;

export class AssistantSketcher {


  executeCommand(command: string): void {
    console.log("I received the command :" + command);
    this._CreateOrFindContext(command);
    // let com: Commands = this._findCommand(command);
    // let obj: GeoObjects = this._findObject(command);
    // switch (com) {
    //   case Commands.DRAW:
    //     return this._draw(obj);
    // }
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

  private _CreateOrFindContext(command: string) {
        let context =  new Context();
        let tokens = command.split(" ");
        let expression:Expression|null = new ExpressionParser().parse(command);
        if(expression) {
          console.log("AssistantSketcher:: expression " + expression );
          if(expression.toString() == 'clear grid') {
              // clear the grid and return;
          }
          if(expression.toString() == "pizza frac") {

          }
        }
        if(context.level == 1) {
          // @ts-ignore
          project.activeLayer.removeChildren();
            let commandObj:Command  = new CommandParser().parse(command);
            context.screenType = ScreenType.ADDITION;
            let blockLayer:BlockLayer = new BlockLayer();
            let vizBlocks:Block[] = [];
            let minVizRadius:number = 1000;
            let expressionGroup:Group = new Group();
            commandObj.params.forEach((commandParam:CommandParam) => {
              let block:Block = TextBlock.CreateTextBlock(commandParam.getStringValue());
              if(commandParam.isNumeric() && context.getSettings().getConfig().isVisualizationEnabledByDefault()) {
                let imageBlock: ImageBlock = ImageBlock.CreateImageBlock(new Size(200,200),commandParam.getNumericValue());
                let groupBlock = new GroupBlock(Layout.VERTICAL);
                groupBlock.addBlock(block);
                groupBlock.addBlock(imageBlock);
                vizBlocks.push(imageBlock);
                minVizRadius = Math.min(minVizRadius, imageBlock.getRadius());
                block = groupBlock;
              }
              expressionGroup.addChild(block.getGroup());
              blockLayer.addBlock(block);
            });
            if(context.getSettings().getConfig().isVisualizationShared()) {
              vizBlocks.forEach((block) => {
                let imageBlock:ImageBlock = block as ImageBlock;
                imageBlock.setSharedRadius(minVizRadius);
              });
            }


             // @ts-ignore
            let viewRect:Rectangle = view.bounds;
            // let topLeftPoint = new Point(viewRect.size.width/3, 0);
            let topLeftPoint = new Point(0, 0);
            // let width = viewRect.size.width - topLeftPoint.x;
          let width = viewRect.size.width*2/3;
            // let height = viewRect.size.height - topLeftPoint.y;
          let height = viewRect.size.height - topLeftPoint.y;
            let rect:Rectangle = new Rectangle(topLeftPoint, new paper.Size(width, height))
            let viewBox:WrapperBox = WrapperBox._convertRect2Box(rect);
            SizeCalculator.calculate(GlobalAlignment.CENTER, blockLayer, viewBox)
            blockLayer.getBlocks().forEach((block) =>{
              block.draw();
            });
            // expressionGroup.visible = false;
          let finalPos = expressionGroup.position;
          expressionGroup.applyMatrix = false;
          expressionGroup.tween(
              // { scaling: 0.1, position:new Point(0,0)},
              { scaling: 0.1},
              // { scaling: 1, position:finalPos },
              { scaling: 1},
              { duration: 1500 }
          ).then(()=>{
            expressionGroup.applyMatrix = true;
          });
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