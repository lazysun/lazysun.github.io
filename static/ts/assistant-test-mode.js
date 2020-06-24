/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />
export class TestMode {
    onModeChanged(state, mode) {
        console.log("on mode changed");
    }
    onKeyDelete(state, event) {
    }
    onKeyDown(state, event) {
    }
    onKeyEscape(state, event) {
    }
    onKeyTab(state, event) {
    }
    onMouseDrag(state, event) {
    }
    onMouseUp(state, event) {
    }
    onMouseDown(state, event) {
        console.log("Ts Lestssfffdsdd23" + state.initialAlignedPoint);
    }
}
