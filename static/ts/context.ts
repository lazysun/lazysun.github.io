import {ScreenType} from './screen-type.js';
import {Subject} from './subject.js';
import {Settings} from './settings.js';

export class Context {

    public level = 1; // max value between 1:17 1 means beginner level
    public screenType:ScreenType = ScreenType.GRID;
    public subject:Subject = Subject.NONE;
    private settings:Settings = new Settings();

    public getSettings() {
        return this.settings;
    }


}

