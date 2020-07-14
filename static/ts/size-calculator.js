import { Size } from './size.js';
import { GlobalAlignment } from './global-alignment.js';
import { WrapperBox } from './wrapper-box.js';
import { Layout } from './layout.js';
var Point = paper.Point;
export class SizeCalculator {
    /**
     * Assumes boxes are all positioned @ 0,0
     * @param alignment
     * @param boxes
     * @param viewBox
     */
    static calculate(alignment, blockLayer, viewBox) {
        let minWidth = 0;
        let minHeight = 0;
        if (blockLayer.getLayout() == Layout.HORIZONTAL) {
            blockLayer.getBlocks().forEach(block => {
                minWidth += block.getBox().getSize().getWidth();
                minHeight = Math.max(minHeight, block.getBox().getSize().getHeight());
            });
        }
        else {
            console.log("Not implemented for Vertical Layout");
        }
        let minSize = new Size(minWidth, minHeight);
        if (!viewBox.getSize().canFit(minSize)) {
            console.log("Boxes are too big to fit in the view .. Aborting");
            return WrapperBox.defaultBox;
        }
        if (alignment == GlobalAlignment.CENTER) {
            let yCord = minHeight;
            let totalSpaceForPaddingY = viewBox.getSize().getHeight() - minHeight;
            let interBoxVerticalPadding = totalSpaceForPaddingY / 2;
            let totalSpaceForPaddingX = viewBox.getSize().getWidth() - minWidth;
            let interBoxHorizontalPadding = totalSpaceForPaddingX / (blockLayer.getBlocks().length + 1);
            let startX = viewBox.getTopLeft().x + interBoxHorizontalPadding;
            let startY = viewBox.getTopLeft().y + interBoxVerticalPadding;
            blockLayer.getBlocks().forEach(block => {
                block.setTopLeftPosition(new Point(startX, startY));
                startX += block.getBox().getSize().getWidth();
                startX += interBoxHorizontalPadding;
            });
        }
        return WrapperBox.defaultBox;
    }
}
SizeCalculator.defaultSize = new Size(0, 0);
