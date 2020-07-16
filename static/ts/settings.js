import { Config } from './config.js';
import { HighlightConfig } from './config/highlight-config.js';
export class Settings {
    constructor() {
        this.config = new Config();
        this.highLightConfig = new HighlightConfig();
    }
    getConfig() {
        return this.config;
    }
    getHighLightConfig() {
        return this.highLightConfig;
    }
}
