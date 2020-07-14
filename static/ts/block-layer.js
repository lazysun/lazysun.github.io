import { Layout } from './layout.js';
export class BlockLayer {
    constructor() {
        this.layout = Layout.HORIZONTAL;
        this.blocks = [];
    }
    addBlock(block) {
        this.blocks.push(block);
    }
    getLayout() {
        return this.layout;
    }
    getBlocks() {
        return this.blocks;
    }
}
