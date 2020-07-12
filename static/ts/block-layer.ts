import {Layout} from './layout.js';
import {Block} from './block.js';

export class BlockLayer {

  private layout:Layout = Layout.HORIZONTAL;
  private blocks:Array<Block> = [];

  addBlock(block:Block) {
    this.blocks.push(block);
  }

  getLayout():Layout {
    return this.layout;
  }

  getBlocks():Array<Block> {
    return this.blocks;
  }


}