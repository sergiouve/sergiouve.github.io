var commands = require('./commands');

var terminal = {

    commands_list_path: '/lib/commands.json',
    $app: $('#terminal'),

    terminalHandleInput: function(input, pressed_key) {
        if (pressed_key == '13') {
            this.handleCommandInput(input, this.executeTerminalCommand);
            this.generateNewTerminalLine();
            this.updateCommandHistory(input);
            return;
        } else {
            // TODO
            return;
        }
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
        console.log('done');
        this.focusTerminal();
    },

    focusTerminal: function() {
        console.log('focusing terminal...');
        var $terminal = this.$app.find('.terminal-input:last-child');
        $terminal.focus();
        console.log('done');
    },

    executeTerminalCommand: function(input, commandsList) {
        var is_a_yodo_command = terminal.askYodo();

        if (is_a_yodo_command) {
            return;
        }

        if (commandsList[input]) {
            console.log('ok');
            terminal.executeCommandByName(input, window);
        } else {
            if (input != '')
                printError('notFound');
        }

        return 1;
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

        $terminalBox.clone().insertAfter($terminalBox);
        $terminalInput.prop('disabled', true);

        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        $terminalInput.val(null);
        $terminalInput.focus();
        this.initTerminalListener();

        return 1;
    },

    updateCommandHistory: function(input) {
        return 1;
    },

    askYodo: function() {
        return 0;
    },

    printError: function(code) {
        switch (code) {

            case 'notFound':
                console.log('command not found');
                break;

        }
    },

    executeCommandByName: function(commandName, context /*, args */ ) {
        console.log(commandName);
    }
}

module.exports = terminal;
