/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />

import AssistantMode = Assistant.AssistantMode;
import {FreehandMode} from './freehand-mode.js';
import {Modes} from './modes.js';
import {SelectionMode} from './selection-mode.js';
import {HighlightMode} from './highlight-mode.js';
import {Context} from '../context.js';

export class ModeDelegator {

  private freehandMode = new FreehandMode();
  private testMode = new FreehandMode();
  private selectionMode = new SelectionMode();

  private highLightMode:HighlightMode;
  private context:Context;

  constructor(context:Context) {
    this.context = context;
    this.highLightMode = new HighlightMode(this.context);
  }

  getModeDelegator(mode: Modes): AssistantMode {
    switch (mode) {
      case Modes.FREEHAND_MODE:
        return this.freehandMode;
      case Modes.HIGHLIGHT_MODE:
        return this.highLightMode;
      case Modes.LINE_MODE:
        return this.testMode;
      case Modes.SELECTION_MODE:
        return this.selectionMode;
      default:
        return this.freehandMode;
    }
  }
}