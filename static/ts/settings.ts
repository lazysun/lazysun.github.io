import {Config} from './config.js';
import {HighlightConfig} from './config/highlight-config.js';
import {SelectionConfig} from './config/selection-config.js';

export class Settings {
  private config:Config = new Config();
  private highLightConfig:HighlightConfig =  new HighlightConfig();
  private _selectionConfig:SelectionConfig = new SelectionConfig();

  public getConfig() {
    return this.config;
  }

  public getHighLightConfig() {
    return this.highLightConfig;
  }

  public getSelectionConfig() {
    return this._selectionConfig;
  }
}