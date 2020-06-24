/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />

import AssistantMode = Assistant.AssistantMode;

export class TestMode implements AssistantMode {

  onMouseDown(state: Assistant.State, event: paper.Event) {
      console.log("Ts onMouseDown called");
  }
}