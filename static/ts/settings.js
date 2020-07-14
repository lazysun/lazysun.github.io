import { Config } from './config.js';
export class Settings {
    constructor() {
        this.config = new Config();
    }
    getConfig() {
        return this.config;
    }
}
