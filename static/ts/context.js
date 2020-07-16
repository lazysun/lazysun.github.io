import { ScreenType } from './screen-type.js';
import { Subject } from './subject.js';
import { Settings } from './settings.js';
import { Modes } from './modes/modes.js';
import { AssistantState } from './assistant-state.js';
export class Context {
    constructor() {
        this.level = 1; // max value between 1:17 1 means beginner level
        this.screenType = ScreenType.GRID;
        this.subject = Subject.NONE;
        this.settings = new Settings();
        this._mode = Modes.FREEHAND_MODE;
        this._currentState = new AssistantState();
    }
    getSettings() {
        return this.settings;
    }
    getMode() {
        return this._mode;
    }
    setMode(mode) {
        this._mode = mode;
    }
    getCurrentState() {
        return this._currentState;
    }
}
