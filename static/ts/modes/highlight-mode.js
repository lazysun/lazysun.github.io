import { CircularFocus } from '../operation/circular-focus.js';
import { RectangleDrag } from '../operation/rectangle-drag.js';
export class HighlightMode {
    constructor(context) {
        this._context = context;
        this._circularFocus = CircularFocus.getInstance();
        this._highlightConfig = this._context.getSettings().getHighLightConfig();
        this._dragRect = RectangleDrag.getInstance();
    }
    onKeyDelete(state, event) {
        console.log("HighLightMode:: onKeyDeleteCalled");
        this._circularFocus.disable();
        this._dragRect.disable();
        if (this._highlightConfig.isDragRectEnabled()) {
            this._dragRect.popMark();
        }
        else {
            this._circularFocus.popMark();
        }
    }
    onKeyDown(state, event) {
    }
    onKeyEscape(state, event) {
        this._circularFocus.disable();
        this._dragRect.disable();
    }
    onKeyTab(state, event) {
    }
    onModeChanged(state, mode) {
        this._circularFocus.disable();
        this._dragRect.disable();
    }
    onMouseDown(state, event) {
        if (this._highlightConfig.isCircularFocusEnabled()) {
            // @ts-ignore
            let downPoint = event.point;
            let radius = this._highlightConfig.getFocusRadius();
            this._circularFocus.create(this._context, downPoint, radius);
        }
    }
    onMouseDrag(state, event) {
        this._circularFocus.disable();
        // @ts-ignore
        let downPoint = event.point;
        if (this._highlightConfig.isDragRectEnabled()) {
            if (state.initialRawPoint != null) {
                this._dragRect.create(this._context, state.initialRawPoint, downPoint, false);
            }
            else {
                console.error("initial raw point is null in highlight mode");
            }
        }
        else if (this._highlightConfig.isCircularFocusEnabled()) {
            let radius = this._highlightConfig.getFocusRadius();
            this._circularFocus.create(this._context, downPoint, radius);
        }
    }
    onMouseUp(state, event) {
        // @ts-ignore
        let downPoint = event.point;
        if (this._highlightConfig.leaveMarkEnabled()) {
            if (this._highlightConfig.isDragRectEnabled()) {
                if (state.initialRawPoint != null) {
                    this._dragRect.leaveMark(this._context, state.initialRawPoint, downPoint, false);
                }
                else {
                    console.error("initial raw point is null in highlight mode");
                }
            }
            else if (this._highlightConfig.isCircularFocusEnabled()) {
                let radius = this._highlightConfig.getFocusRadius();
                this._circularFocus.leaveMark(this._context, downPoint, radius);
            }
        }
        else {
            this._circularFocus.disable();
            this._dragRect.disable();
        }
    }
}
