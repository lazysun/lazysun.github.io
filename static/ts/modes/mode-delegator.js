/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
import { FreehandMode } from './freehand-mode.js';
import { Modes } from './modes.js';
import { SelectionMode } from './selection-mode.js';
import { HighlightMode } from './highlight-mode.js';
export class ModeDelegator {
    constructor(context) {
        this.freehandMode = new FreehandMode();
        this.testMode = new FreehandMode();
        this.selectionMode = new SelectionMode();
        this.context = context;
        this.highLightMode = new HighlightMode(this.context);
    }
    getModeDelegator(mode) {
        switch (mode) {
            case Modes.FREEHAND_MODE:
                return this.freehandMode;
            case Modes.HIGHLIGHT_MODE:
                return this.highLightMode;
            case Modes.LINE_MODE:
                return this.testMode;
            case Modes.SELECTION_MODE:
                return this.selectionMode;
            default:
                return this.freehandMode;
        }
    }
}
