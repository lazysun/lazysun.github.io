import {HighLightMode} from '../js/assistant-paper-highlight.js';
import {LineMode} from '../js/assistant-paper-linemode.js';
import {AssistantPaperUtil} from '../js/assistant-paper-util.js';
import {AssistantState} from "../ts/assistant-state.js"
import {ModeDelegator} from '../ts/modes/mode-delegator.js';

export const debug = false;
const assistantPaperUtil = new AssistantPaperUtil();


paper.install(window);

window.onload = function () {
  // Setup directly from canvas id:
  paper.setup('myCanvas');

  var tool = new Tool();
  var currentState = new AssistantState();
  let delegator = new ModeDelegator();

  tool.onMouseDown = function (event) {
    // can make a new state object too
    currentState.initialRawPoint = event.point;
    currentState.initialAlignedPoint = assistantPaperUtil.computeAlignedPoint(
        currentState.initialRawPoint);

    if (currentConfig.mode == modes.HIGHLIGHT) {
      HighLightMode.onMouseDown(currentState, event);
    } else if(currentConfig.mode == modes.LINES) {
      LineMode.omMouseDown(currentState, event);
    } else if(currentConfig.mode == modes.FREE_HAND) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDown(currentState, event);
      // new FreehandMode().onMouseDown(currentState, event);
    } else if(currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDown(currentState, event);
    }

  }

  tool.onMouseDrag = function (event) {
    if (debug) {
      console.log("Mouse drag event fired " + event);
    }
    if (currentConfig.mode == modes.HIGHLIGHT) {
      HighLightMode.onMouseDrag(currentState, event);
    }
    else if(currentConfig.mode == modes.LINES) {
      LineMode.onMouseDrag(currentState, event);
    } else if(currentConfig.mode == modes.FREE_HAND) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDrag(currentState, event);
    } else if(currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDrag(currentState, event);
    }
  }

  tool.onMouseUp = function (event) {
    if (debug) {
      console.log("Mouse up event fired " + event);
    }
    if (currentConfig.mode == modes.HIGHLIGHT) {
      HighLightMode.onMouseUp(currentState, event);
    }
    else if(currentConfig.mode == modes.LINES) {
      LineMode.onMouseUp(currentState, event);
    } else if(currentConfig.mode == modes.FREE_HAND){
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseUp(currentState, event);
    } else if(currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseUp(currentState, event);
    }

  }

  tool.onKeyDown = function onKeyDown(event) {
    if (debug) {
      console.log("This key was pressed " + event.key);
    }
    if (currentConfig.mode == modes.HIGHLIGHT) {
        HighLightMode.onKeyDown(currentState, event);
    } else if(currentConfig.mode == modes.FREE_HAND){
      delegator.getModeDelegator(currentConfig.selectedMode).onKeyDown(currentState, event);
    } else if(currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onKeyDown(currentState, event);
    }
  }

  $(document).bind('mode_changed', function (event, selectedMode) {
    console.log("Mode Changed " + selectedMode);
    HighLightMode.omMenuChanged(currentState, selectedMode);
  });

  if (currentConfig.showGrid) {
    assistantPaperUtil.drawGrid();
  }

}