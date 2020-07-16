import AssistantMode = Assistant.AssistantMode;
import {Context} from '../context.js';
import {CircularFocus} from '../operation/circular-focus.js';
import {HighlightConfig} from '../config/highlight-config.js';
import {RectangleDrag} from '../operation/rectangle-drag.js';

export class HighlightMode implements AssistantMode {

  private _context: Context;
  private _circularFocus: CircularFocus;
  private _dragRect: RectangleDrag;
  private _highlightConfig: HighlightConfig;

  constructor(context: Context) {
    this._context = context;
    this._circularFocus = CircularFocus.getInstance();
    this._highlightConfig = this._context.getSettings().getHighLightConfig();
    this._dragRect = RectangleDrag.getInstance();

  }

  onKeyDelete(state: Assistant.State, event: paper.Event): void {
    console.log("HighLightMode:: onKeyDeleteCalled");
    this._circularFocus.disable();
    this._dragRect.disable();
    if (this._highlightConfig.isDragRectEnabled()) {
      this._dragRect.popMark();
    }else {
      this._circularFocus.popMark();
    }
  }

  onKeyDown(state: Assistant.State, event: paper.Event): void {
  }

  onKeyEscape(state: Assistant.State, event: paper.Event): void {
    this._circularFocus.disable();
    this._dragRect.disable();
  }

  onKeyTab(state: Assistant.State, event: paper.Event): void {
  }

  onModeChanged(state: Assistant.State, mode: string): void {
    this._circularFocus.disable();
    this._dragRect.disable();
  }

  onMouseDown(state: Assistant.State, event: paper.Event): void {
    if (this._highlightConfig.isCircularFocusEnabled()) {
      // @ts-ignore
      let downPoint = event.point;
      let radius: number = this._highlightConfig.getFocusRadius();
      this._circularFocus.create(this._context, downPoint, radius);
    }
  }

  onMouseDrag(state: Assistant.State, event: paper.Event): void {
    this._circularFocus.disable();
    // @ts-ignore
    let downPoint = event.point;
    if (this._highlightConfig.isDragRectEnabled()) {
      if (state.initialRawPoint != null) {
        this._dragRect.create(this._context, state.initialRawPoint, downPoint, false);
      } else {
        console.error("initial raw point is null in highlight mode");
      }
    } else if (this._highlightConfig.isCircularFocusEnabled()) {

      let radius: number = this._highlightConfig.getFocusRadius();
      this._circularFocus.create(this._context, downPoint, radius);
    }
  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
    // @ts-ignore
    let downPoint = event.point;
    if (this._highlightConfig.leaveMarkEnabled()) {
      if (this._highlightConfig.isDragRectEnabled()) {
        if (state.initialRawPoint != null) {
          this._dragRect.leaveMark(this._context, state.initialRawPoint, downPoint, false);
        } else {
          console.error("initial raw point is null in highlight mode");
        }
      } else if (this._highlightConfig.isCircularFocusEnabled()) {

        let radius: number = this._highlightConfig.getFocusRadius();
        this._circularFocus.leaveMark(this._context, downPoint, radius);
      }
    }else {
      this._circularFocus.disable();
      this._dragRect.disable();
    }
  }


}