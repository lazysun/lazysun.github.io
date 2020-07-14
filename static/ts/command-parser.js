import { Command } from './command.js';
import { CommandParam } from './command-param.js';
import { ExpressionParser } from './expression-parser.js';
export class CommandParser {
    constructor() {
        this.debug = true;
    }
    parse(command) {
        let commandObj = new Command();
        let expressionObj = new ExpressionParser().parse(command);
        if (expressionObj) {
            console.log("CommandPaser:: command received " + command);
            let cleanCommand = expressionObj.toString();
            console.log("CommandPaser:: after cleaning  " + cleanCommand);
            let withIndex = cleanCommand.search("with");
            let vizHelp = "";
            if (withIndex > 0) {
                vizHelp = cleanCommand.slice(withIndex);
                console.log("CommandPaser:: visualiation true   " + vizHelp);
                cleanCommand = cleanCommand.substr(0, withIndex + 1);
            }
            let firstIndexOfSeparator = cleanCommand.indexOf(" ");
            let expression = "";
            let commandAction = "show";
            if (firstIndexOfSeparator > 0) {
                expression = cleanCommand.slice(firstIndexOfSeparator).trim();
                commandAction = cleanCommand.split(' ', 1)[0];
                console.log("CommandParser:: command expression    " + expression);
                console.log("CommandParser:: command action    " + commandAction);
            }
            else {
                commandAction = cleanCommand;
                console.log("CommandParser:: command expression   -NA- ");
                console.log("CommandParser:: command action    " + commandAction);
            }
            let commandObj = new Command();
            commandObj.action = commandAction;
            console.log("CommandParser:: command action    " + commandObj.action);
            if (expression) {
                console.log("CommandParser:: command expression after -   " + expression);
                let tokens = expression.split(' ');
                for (let i = 0; i < tokens.length; i++) {
                    let token = tokens[i];
                    let commandParam = new CommandParam(token);
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
    _clean(command) {
        let cleanCommand = command.replace(/\s+/g, ' ').trim();
        if (this.debug)
            console.log(" clean command : " + cleanCommand);
        return command;
    }
    _splitCommandAndArgs(command) {
        tokens: [] = command.split(' ');
    }
}
