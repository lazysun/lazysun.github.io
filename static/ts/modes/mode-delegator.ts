/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />

import AssistantMode = Assistant.AssistantMode;
import {FreehandMode} from './freehand-mode.js';
import {Modes} from './modes.js';
import {SelectionMode} from './selection-mode.js';
import {HighlightMode} from './highlight-mode.js';
import {Context} from '../context.js';
import {SlicerMode} from './slicer-mode.js';
import {EmptyMode} from './empty-mode.js';

export class ModeDelegator {

  private freehandMode = new FreehandMode();
  private testMode = new FreehandMode();
  private emptyMode = new EmptyMode();
  private selectionMode:SelectionMode;

  private highLightMode:HighlightMode;
  private slicerMode:SlicerMode;
  private context:Context;

  constructor(context:Context) {
    this.context = context;
    this.highLightMode = new HighlightMode(this.context);
    this.slicerMode = new SlicerMode(this.context);
    this.selectionMode = new SelectionMode(this.context);
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
      case Modes.SLICER_MODE:
        return  this.slicerMode;
      case Modes.EMPTY_MODE:
        return  this.slicerMode;
      default:
        return this.emptyMode;
    }
  }
}