import { Config } from './config.js';
import { HighlightConfig } from './config/highlight-config.js';
import { SelectionConfig } from './config/selection-config.js';
export class Settings {
    constructor() {
        this.config = new Config();
        this.highLightConfig = new HighlightConfig();
        this._selectionConfig = new SelectionConfig();
    }
    getConfig() {
        return this.config;
    }
    getHighLightConfig() {
        return this.highLightConfig;
    }
    getSelectionConfig() {
        return this._selectionConfig;
    }
}
