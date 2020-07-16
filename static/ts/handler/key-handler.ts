import {ModeDelegator} from '../modes/mode-delegator.js';
import {Context} from '../context.js';
import Event = paper.Event;

export class KeyHandler {

  private _debug:boolean = true;
  private _delegator:ModeDelegator;
  private _context:Context;

  constructor(context:Context, delegator:ModeDelegator) {
    this._delegator = delegator;
    this._context = context;
  }

  onKeyDown(event:Event) {
    // @ts-ignore
    let key = event.key;
    let assistantMode =  this._delegator.getModeDelegator(this._context.getMode());
    let state =  this._context.getCurrentState();
     if (this._debug) {
       console.log("This key was pressed Key Handler " + key);
       //tab,escape,enter,backspace(delete), shift, meta(Command), alt(Option), control
     }
    assistantMode.onKeyDown(
        state, event);
    if(key == 'backspace' || key == 'delete') {
      assistantMode.onKeyDelete(state, event);
    }
    if(key == 'escape') {
      assistantMode.onKeyEscape(state, event);
    }
    if(key == 'tab') {
      assistantMode.onKeyTab(state, event);
    }

   }
}