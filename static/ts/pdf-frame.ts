import Raster = paper.Raster;

export class PageInfo {
  constructor(currentPage: number, maxPage: number) {
    this.currentPage = currentPage;
    this.maxPage = maxPage;
  }
  currentPage: number = 0;
  maxPage: number = 0;
}

export class PdfFrame {

  private _pdfCanvasId: string | null = 'secondCanvas';
  private _pdfDoc: any = null;
  private _totalPages: number = 0;
  private _currentPage: number = 1;

  show(pdfName: string, pageNo: number): Promise<PageInfo> {
    let pdfPath: string = './static/pdf/' + pdfName;
    // @ts-ignore
    return pdfjsLib.getDocument(pdfPath).promise.then(doc => {
      console.log("This file has " + doc._pdfInfo.numPages);
      this._pdfDoc = doc;
      this._totalPages = doc._pdfInfo.numPages;
      return this._showCurrentPage();
    });

  }

  getMaxPage(): number {
    return this._totalPages;
  }

  showNextPage(): Promise<PageInfo> {
    if (this._pdfDoc) {
      this._currentPage = Math.min(this._currentPage + 1, this._totalPages)
      return this._showCurrentPage();
    }
    return Promise.resolve(new PageInfo(0, 0));
  }

  showPrevPage(): Promise<PageInfo> {
    if (this._pdfDoc) {
      this._currentPage = Math.max(this._currentPage - 1, 1)
      return this._showCurrentPage();
    }
    return Promise.resolve(new PageInfo(0, 0));
  }

  private _showCurrentPage(): Promise<PageInfo> {
    if (this._pdfDoc) {
      const currentPage = this._currentPage;
      const totalPage = this._totalPages;
      return this._pdfDoc.getPage(this._currentPage).then((page: any) => {
        const canvasId = this._pdfCanvasId;
        const scale = 1;
        let viewport = page.getViewport({scale: scale});
        // @ts-ignore
        const myCanvas: HTMLCanvasElement = document.getElementById(canvasId);
        myCanvas.height = viewport.height;
        myCanvas.width = viewport.width;
        myCanvas.style.height = myCanvas.height + 'px';
        myCanvas.style.width = myCanvas.width + 'px';
        let context = myCanvas.getContext("2d");
        return page.render({
          canvasContext: context,
          viewport: page.getViewport({scale: scale}),
        }).promise.then(function () {
          // @ts-ignore
          let previousRaster = project.activeLayer.children['pdf'];
          if(previousRaster) {
            previousRaster.remove();
          }
          // @ts-ignore
          let raster = new Raster(document.getElementById("secondCanvas").toDataURL());
          raster.scale(1);
          raster.name = 'pdf';
          // @ts-ignore
          raster.position = view.center;
          return Promise.resolve(new PageInfo(currentPage, totalPage));
        });
      });
    }
    return Promise.resolve(new PageInfo(0, 0));
  }
}