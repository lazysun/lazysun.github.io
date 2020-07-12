import {GlobalAlignment} from './global-alignment.js';
import {TextFontsDefaults} from './text-fonts-defaults.js';
import {FontSize} from './font-size.js';

export class AdditionScreen {
  public init(first: number, second: number, withImages?:
      boolean, imagePath?: string) {
      this.addText(first.toString(), GlobalAlignment.MID_LEFT, TextFontsDefaults.VERY_LARGE);
      this.addText("+", GlobalAlignment.MID_CENTER, TextFontsDefaults.VERY_LARGE);
      this.addText(second.toString(), GlobalAlignment.MID_LEFT, TextFontsDefaults.VERY_LARGE);
  }

  private addText(first:string, alignment:GlobalAlignment, fontSize:FontSize) {

  }
}