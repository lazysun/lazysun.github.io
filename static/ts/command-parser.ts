import {Command} from './command.js';
import {CommandParam} from './command-param.js';
import {ExpressionParser} from './expression-parser.js';
import {Expression} from './expression.js';

export class CommandParser {

   debug:boolean = true;

   parse(command:string):Command {
     let commandObj: Command = new Command();
     let expressionObj:Expression|null = new ExpressionParser().parse(command);
     if(expressionObj) {

       console.log("CommandPaser:: command received " + command);
       let cleanCommand: string = expressionObj.toString()
       console.log("CommandPaser:: after cleaning  " + cleanCommand);
       let withIndex: number = cleanCommand.search("with");
       let vizHelp: string = "";
       if (withIndex > 0) {

         vizHelp = cleanCommand.slice(withIndex);
         console.log("CommandPaser:: visualiation true   " + vizHelp);
         cleanCommand = cleanCommand.substr(0, withIndex + 1);
       }
       let firstIndexOfSeparator = cleanCommand.indexOf(" ");
       let expression: string = "";
       let commandAction: string = "show";
       if (firstIndexOfSeparator > 0) {
         expression = cleanCommand.slice(firstIndexOfSeparator).trim();
         commandAction = cleanCommand.split(' ', 1)[0];
         console.log("CommandParser:: command expression    " + expression);
         console.log("CommandParser:: command action    " + commandAction);
       } else {
         commandAction = cleanCommand;
         console.log("CommandParser:: command expression   -NA- ");
         console.log("CommandParser:: command action    " + commandAction);
       }

       let commandObj: Command = new Command();
       commandObj.action = commandAction;
       console.log("CommandParser:: command action    " + commandObj.action);
       if (expression) {
         console.log("CommandParser:: command expression after -   " + expression);
         let tokens: string[] = expression.split(' ');

         for (let i = 0; i < tokens.length; i++) {
           let token: string = tokens[i];
           let commandParam: CommandParam = new CommandParam(token);
           if (withIndex > 0) {
             commandParam.enableVisualization(true, vizHelp);
           }
           commandObj.params.push(commandParam);
         }
       }
       return commandObj;
     }
     return commandObj;
   }

   private _clean(command:string):string {
     let cleanCommand:string = command.replace(/\s+/g,' ').trim();
     if(this.debug) console.log(" clean command : " + cleanCommand);
     return command;
   }

   private _splitCommandAndArgs(command:string) {
     tokens:[] = command.split(' ');

   }
}