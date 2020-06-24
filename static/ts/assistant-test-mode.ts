/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />

import AssistantMode = Assistant.AssistantMode;

export class TestMode implements AssistantMode {

  onModeChanged(state: Assistant.State, mode: string): void {
    console.log("on mode changed");
  }

  onKeyDelete(state: Assistant.State, event: paper.Event): void {
  }

  onKeyDown(state: Assistant.State, event: paper.Event): void {
  }

  onKeyEscape(state: Assistant.State, event: paper.Event): void {
  }

  onKeyTab(state: Assistant.State, event: paper.Event): void {
  }

  onMouseDrag(state: Assistant.State, event: paper.Event): void {
  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
  }

  onMouseDown(state: Assistant.State, event: paper.Event) {
    console.log("Ts Lestssfffdsdd23" + state.initialAlignedPoint);
  }
}