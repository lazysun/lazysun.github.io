/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
var Path = paper.Path;
import { Defaults } from '../defaults.js';
export class FreehandMode {
    onMouseDown(state, event) {
        state.path = new Path({
            // @ts-ignore
            segments: [event.point],
            name: 'freehand',
            strokeColor: Defaults.defaultStrokeColor,
            strokeWidth: Defaults.defaultStrokeWidth,
            // Select the path, so we can see its segment points:
            fullySelected: false
        });
    }
    onMouseDrag(state, event) {
        if (state.path) {
            // @ts-ignore
            state.path.add(event.point);
        }
    }
    onMouseUp(state, event) {
        state.path = null;
    }
    onKeyDelete(state, event) {
    }
    onKeyDown(state, event) {
    }
    onKeyEscape(state, event) {
    }
    onKeyTab(state, event) {
    }
    onModeChanged(state, mode) {
    }
}
