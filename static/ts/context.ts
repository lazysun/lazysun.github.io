import {ScreenType} from './screen-type.js';
import {Subject} from './subject.js';
import {Settings} from './settings.js';
import {Modes} from './modes/modes.js';
import {AssistantState} from './assistant-state.js';

export class Context {

    public level = 1; // max value between 1:17 1 means beginner level
    public screenType:ScreenType = ScreenType.GRID;
    public subject:Subject = Subject.NONE;
    private settings:Settings = new Settings();
    private _mode:Modes = Modes.FREEHAND_MODE;
    private _currentState = new AssistantState();


    public getSettings() {
        return this.settings;
    }

    public getMode():Modes {
        return this._mode;
    }

    public setMode(mode:Modes):void {
        this._mode = mode;
    }

    public getCurrentState():AssistantState {
        return this._currentState;
    }


}

