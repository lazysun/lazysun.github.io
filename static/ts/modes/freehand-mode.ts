/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />

import AssistantMode = Assistant.AssistantMode;
import Path = paper.Path;
import Point = paper.Point;
import Event = paper.Event;

import {Defaults} from '../defaults.js';

export class FreehandMode implements AssistantMode {

  onMouseDown(state: Assistant.State, event: paper.Event): void {
    state.path = new Path({
      // @ts-ignore
      segments: [event.point],
      name: 'freehand',
      strokeColor: Defaults.defaultStrokeColor,
      strokeWidth: Defaults.defaultStrokeWidth,
      // Select the path, so we can see its segment points:
      fullySelected: false
    });
  }

  onMouseDrag(state: Assistant.State, event: paper.Event): void {
    if(state.path) {
      // @ts-ignore
      state.path.add(event.point);
    }
  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
    state.path = null;
  }

  onKeyDelete(state: Assistant.State, event: paper.Event): void {
  }

  onKeyDown(state: Assistant.State, event: paper.Event): void {
  }

  onKeyEscape(state: Assistant.State, event: paper.Event): void {
  }

  onKeyTab(state: Assistant.State, event: paper.Event): void {
  }

  onModeChanged(state: Assistant.State, mode: string): void {
  }
}