import { FractionalTextBlock } from '../../blocks/fractional-text-block.js';
import { WrapperBox } from '../../wrapper-box.js';
import { SizeCalculator } from '../../size-calculator.js';
import { GlobalAlignment } from '../../global-alignment.js';
var Rectangle = paper.Rectangle;
var Point = paper.Point;
import { BlockLayer } from '../../block-layer.js';
var Group = paper.Group;
import { PizzaBlock } from '../../blocks/pizza-block.js';
import { Size } from '../../size.js';
import { GroupBlock } from '../../group-block.js';
import { Layout } from '../../layout.js';
export class FractionScreen {
    constructor(expression) {
        this._expression = expression;
        console.log("FractionScreen::" + expression);
        this._fractionalBlock = FractionalTextBlock.CreateTextBlock("4", "2");
        this._pizzaBlock = PizzaBlock.CreateImageBlock(new Size(400, 400));
        // @ts-ignore
        $(document).bind("sliced", () => {
            this.onFractionChange();
        });
        // @ts-ignore
        $(document).bind("sliced-selection", () => {
            this.onFractionChange();
        });
    }
    onFractionChange() {
        let items = this._pizzaBlock.getGroup().children;
        let denominator = items.length;
        let count = 0;
        items.forEach((item) => {
            if (item.selected) {
                count++;
            }
        });
        let fractionalTextBlock = this._fractionalBlock;
        fractionalTextBlock.setNumbers(denominator, count);
        fractionalTextBlock.draw();
    }
    draw() {
        console.log("FractionScreen :: draw called");
        let blockLayer = new BlockLayer();
        let groupBlock = new GroupBlock(Layout.VERTICAL);
        groupBlock.addBlock(this._fractionalBlock);
        groupBlock.addBlock(this._pizzaBlock);
        blockLayer.addBlock(groupBlock);
        let screenGroup = new Group();
        // @ts-ignore
        let viewRect = view.bounds;
        // let topLeftPoint = new Point(viewRect.size.width/3, 0);
        let topLeftPoint = new Point(0, 0);
        // let width = viewRect.size.width - topLeftPoint.x;
        let width = viewRect.size.width;
        // let height = viewRect.size.height - topLeftPoint.y;
        let height = viewRect.size.height - topLeftPoint.y;
        let rect = new Rectangle(topLeftPoint, new paper.Size(width, height));
        let viewBox = WrapperBox._convertRect2Box(rect);
        SizeCalculator.calculate(GlobalAlignment.CENTER, blockLayer, viewBox);
        blockLayer.getBlocks().forEach((block) => {
            block.draw();
        });
        // expressionGroup.visible = false;
        let finalPos = screenGroup.position;
        screenGroup.applyMatrix = false;
        screenGroup.tween(
        // { scaling: 0.1, position:new Point(0,0)},
        { scaling: 0.1 }, 
        // { scaling: 1, position:finalPos },
        { scaling: 1 }, { duration: 1500 }).then(() => {
            screenGroup.applyMatrix = true;
        });
    }
}
