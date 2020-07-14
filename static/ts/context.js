import { ScreenType } from './screen-type.js';
import { Subject } from './subject.js';
import { Settings } from './settings.js';
export class Context {
    constructor() {
        this.level = 1; // max value between 1:17 1 means beginner level
        this.screenType = ScreenType.GRID;
        this.subject = Subject.NONE;
        this.settings = new Settings();
    }
    getSettings() {
        return this.settings;
    }
}
