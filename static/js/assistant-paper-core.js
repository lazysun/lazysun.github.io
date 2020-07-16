import {HighLightMode} from '../js/assistant-paper-highlight.js';
import {LineMode} from '../js/assistant-paper-linemode.js';
import {AssistantPaperUtil} from '../js/assistant-paper-util.js';
import {AssistantState} from "../ts/assistant-state.js"
import {ModeDelegator} from '../ts/modes/mode-delegator.js';
import {AssistantSketcher} from '../ts/assistant-sketcher.js';
import {PdfFrame} from '../ts/pdf-frame.js';
import {KeyHandler} from '../ts/handler/key-handler.js';
import {Context} from '../ts/context.js';
import {Modes} from '../ts/modes/modes.js';

export const debug = false;
const assistantPaperUtil = new AssistantPaperUtil();

paper.install(window);

window.onload = function () {
  // Setup directly from canvas id:
  paper.setup('myCanvas');

  var tool = new Tool();

  var context = new Context();
  var currentState = context.getCurrentState();
  let delegator = new ModeDelegator(context);
  let assistantSketcher = new AssistantSketcher();
  let keyHandler = new KeyHandler(context, delegator);
  let pdfFrame = new PdfFrame();
  context.setMode(Modes.FREEHAND_MODE);

  tool.onMouseDown = function (event) {
    // can make a new state object too
    currentState.initialRawPoint = event.point;
    currentState.initialAlignedPoint = assistantPaperUtil.computeAlignedPoint(
        currentState.initialRawPoint);

    if (currentConfig.mode == modes.HIGHLIGHT) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDown(
          currentState, event);
    } else if (currentConfig.mode == modes.LINES) {
      LineMode.omMouseDown(currentState, event);
    } else if (currentConfig.mode == modes.FREE_HAND) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDown(
          currentState, event);
      // new FreehandMode().onMouseDown(currentState, event);
    } else if (currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDown(
          currentState, event);
    }

  }

  tool.onMouseDrag = function (event) {
    if (debug) {
      console.log("Mouse drag event fired " + event);
    }
    if (currentConfig.mode == modes.HIGHLIGHT) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDrag(
          currentState, event);
    } else if (currentConfig.mode == modes.LINES) {
      LineMode.onMouseDrag(currentState, event);
    } else if (currentConfig.mode == modes.FREE_HAND) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDrag(
          currentState, event);
    } else if (currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseDrag(
          currentState, event);
    }
  }

  tool.onMouseUp = function (event) {
    if (debug) {
      console.log("Mouse up event fired " + event);
    }
    if (currentConfig.mode == modes.HIGHLIGHT) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseUp(
          currentState, event);
    } else if (currentConfig.mode == modes.LINES) {
      LineMode.onMouseUp(currentState, event);
    } else if (currentConfig.mode == modes.FREE_HAND) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseUp(
          currentState, event);
    } else if (currentConfig.mode == modes.SELECT_MODE) {
      delegator.getModeDelegator(currentConfig.selectedMode).onMouseUp(
          currentState, event);
    }

  }

  tool.onKeyDown = function onKeyDown(event) {
    if (debug) {
      console.log("This key was pressed " + event.key);
    }
    // delegator.getModeDelegator(currentConfig.selectedMode).onKeyDown(
    //     currentState, event);
    keyHandler.onKeyDown(event);
  }

  $(document).bind('mode_changed', function (event, selectedMode) {
    console.log("Mode Changed " + selectedMode);
    HighLightMode.omMenuChanged(currentState, selectedMode);
  });

  $(document).bind('mode_changed_v2', function (event, modeObj) {
    console.log("Mode Changed v2 : prev " + modeObj.prev);
    console.log("Mode Changed v2 : prev " + modeObj.next);
    delegator.getModeDelegator(modeObj.prev).onModeChanged(currentState, modeObj.next);
    context.setMode(modeObj.next);
  });

  $(document).bind('command', function (event, command) {
    console.log("Command recevied at core : " + command);
    assistantSketcher.executeCommand(command);
  });

  $(document).bind('pdf_rendered', function (event) {
    console.log("pdf refmder event  : ");
    console.log(document.getElementById("secondCanvas").toDataURL());
    var raster = new Raster(
        document.getElementById("secondCanvas").toDataURL());
    raster.position = view.center;
  });

  $(document).bind('pdf_viewer', function (event, pdfName) {
    let promise = pdfFrame.show(pdfName, 1);
    promise.then(pageInfo => {
      console.log('Rendering finished : currentPage:' + pageInfo.currentPage
          + " maxPage: " + pageInfo.maxPage);
      $(document).trigger('pagination', pageInfo);
    });
  });

  $(document).bind('next_page', function (event) {
    let promise = pdfFrame.showNextPage();
    promise.then(pageInfo => {
      console.log('Rendering finished : currentPage:' + pageInfo.currentPage
          + " maxPage: " + pageInfo.maxPage);
      $(document).trigger('pagination', pageInfo);
    });
  });

  $(document).bind('previous_page', function (event) {
    let promise = pdfFrame.showPrevPage();
    promise.then(pageInfo => {
      console.log('Rendering finished : currentPage:' + pageInfo.currentPage
          + " maxPage: " + pageInfo.maxPage);
      $(document).trigger('pagination', pageInfo);
    });
  });

  if (context.getSettings().getConfig().isGridEnabled()) {
    assistantPaperUtil.drawGrid();
  }

}