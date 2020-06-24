/// <reference path="./paper.d.ts" />
/// <reference path="./assistant.d.ts" />
export class AssistantState {
    constructor() {
        this.initialAlignedPoint = null;
        this.initialRawPoint = null;
        this.path = null;
        this.selectedItem = null;
    }
    reset() {
        this.initialAlignedPoint = null;
        this.initialRawPoint = null;
        this.path = null;
        this.selectedItem = null;
    }
}
