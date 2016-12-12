var commands = require('./commands');

var terminal = {

    commadHistory: [],
    commadHistoryPointer: 1,
    commands_list_path: './src/js/lib/commands.json',
    $app: $('#terminal'),

    terminalHandleInput: function(input, pressed_key) {
        switch (pressed_key) {
            case 13:
                this.handleCommandInput(input, this.executeTerminalCommand);
                this.commadHistoryPointer = 1;
                break;

            case 38:
                var next_saved_command = this.commadHistory[this.commadHistory.length - this.commadHistoryPointer];
                this.commadHistoryPointer++;
                (next_saved_command != 'undefined') ? command = next_saved_command : command = '';
                this.updateCommandBox(command);
                break;

            case 40:
                var previous_saved_command = this.commadHistory[this.commadHistory.length - this.commadHistoryPointer];
                this.commadHistoryPointer--;
                (previous_saved_command != 'undefined') ? command = previous_saved_command : command = '';
                this.updateCommandBox(command);
                break;

            default:
                return;

        }
        return;
    },

    initTerminalListener: function() {
        console.log('initializing terminal listener...');
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminal = $terminalBox.find('input');

        $terminal.off();

        $terminal.on('keyup', function(e) {
            var pressed_key = e.keyCode || e.which;
            var input = $terminal.val();

            terminal.terminalHandleInput(input, pressed_key);
        });
        console.log('done.');
        this.focusTerminal();
    },

    focusTerminal: function() {
        console.log('focusing terminal...');
        var $terminal = this.$app.find('.terminal-input:last-child');
        $terminal.focus();
        console.log('done.');
    },

    executeTerminalCommand: function(input, commandsList) {
        var is_a_yodo_command = terminal.askYodo();
        var parsedInput = input.split(' ');
        var command = parsedInput[0];
        var parametersList = parsedInput.splice(1, parsedInput.length - 1);

        if (is_a_yodo_command) {
            return;
        }

        if (commandsList[command]) {
            var output = terminal.executeCommandByName(commandsList[command], parametersList);
            terminal.printOutput(output);
        } else {
            if (input != '')
                terminal.printError('not_found');
        }

        terminal.generateNewTerminalLine();
        terminal.updateCommandHistory(input);
    },

    handleCommandInput: function(input, callback) {
        $.getJSON(this.commands_list_path, function(data) {
            var commandsList = (data);
            callback(input, commandsList);
        });
    },

    generateNewTerminalLine: function() {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        var $newLine = $terminalBox.clone();
        var $oldOutput = $newLine.find('.js-output-text');
        $oldOutput.remove();

        $newLine.insertAfter($terminalBox);

        $terminalInput.prop('disabled', true);

        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        $terminalInput.val(null);
        $terminalInput.focus();
        this.initTerminalListener();

        return 1;
    },

    updateCommandBox: function(command) {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        $terminalInput.val(command);
    },

    updateCommandHistory: function(input) {
        this.commadHistory.push(input);
        console.log(this.commadHistory);

        return 1;
    },

    askYodo: function() {
        // TODO
        return 0;
    },

    printError: function(code) {
        switch (code) {

            case 'not_found':
                this.printOutput('command not found');
                break;

        }
    },

    printOutput: function(output) {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        $terminalBox.append('<div class="output js-output-text">' + output + '</div>');
    },

    executeCommandByName: function(command, parameters) {
        return commands[command](parameters);
    }
}

module.exports = terminal;
