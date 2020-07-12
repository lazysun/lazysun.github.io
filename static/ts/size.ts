export class Size {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height;
  }

  public canFit(size:Size):boolean {
    return size.getHeight() < this.height &&  size.getWidth() < this.width;
  }

  public toString() {
    return "Size:: width:"+this.width+", height:"+this.height;
  }
}