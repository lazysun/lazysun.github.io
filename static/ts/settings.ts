import {Config} from './config.js';
import {HighlightConfig} from './config/highlight-config.js';

export class Settings {
  private config:Config = new Config();
  private highLightConfig:HighlightConfig =  new HighlightConfig();

  public getConfig() {
    return this.config;
  }

  public getHighLightConfig() {
    return this.highLightConfig;
  }
}