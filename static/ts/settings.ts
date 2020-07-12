import {Config} from './config.js';

export class Settings {
  private config:Config = new Config();
  public getConfig() {
    return this.config;
  }
}