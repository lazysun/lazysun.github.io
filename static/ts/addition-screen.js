import { GlobalAlignment } from './global-alignment.js';
import { TextFontsDefaults } from './text-fonts-defaults.js';
export class AdditionScreen {
    init(first, second, withImages, imagePath) {
        this.addText(first.toString(), GlobalAlignment.MID_LEFT, TextFontsDefaults.VERY_LARGE);
        this.addText("+", GlobalAlignment.MID_CENTER, TextFontsDefaults.VERY_LARGE);
        this.addText(second.toString(), GlobalAlignment.MID_LEFT, TextFontsDefaults.VERY_LARGE);
    }
    addText(first, alignment, fontSize) {
    }
}
