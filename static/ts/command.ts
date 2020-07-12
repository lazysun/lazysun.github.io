import {CommandParam} from './command-param';

export class Command {
  action:string = "";
  params:CommandParam[] = [];
  _isMathExpression:boolean = false;
  _mathExpression:string = "";

}

