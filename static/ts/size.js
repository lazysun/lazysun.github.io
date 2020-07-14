export class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    canFit(size) {
        return size.getHeight() < this.height && size.getWidth() < this.width;
    }
    toString() {
        return "Size:: width:" + this.width + ", height:" + this.height;
    }
}
