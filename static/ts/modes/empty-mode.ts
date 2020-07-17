/// <reference path="../paper.d.ts" />
/// <reference path="../assistant.d.ts" />
/// <reference path="../defaults.ts" />
import AssistantMode = Assistant.AssistantMode;

export class EmptyMode implements AssistantMode{
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

  onMouseDown(state: Assistant.State, event: paper.Event): void {
  }

  onMouseDrag(state: Assistant.State, event: paper.Event): void {
  }

  onMouseUp(state: Assistant.State, event: paper.Event): void {
  }

}