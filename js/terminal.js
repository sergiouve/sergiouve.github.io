var commands = require('./commands');

var terminal = {

    commands_list_path: '/lib/commands.json',
    $app: $('#terminal'),

    terminalHandleInput: function(input, pressed_key) {
        if (pressed_key == '13') {
            this.handleCommandInput(input, executeTerminalCommand);
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

            this.terminalHandleInput(input, pressed_key);
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
        var is_a_yodo_command = askYodo();

        if (is_a_yodo_command) {
            return;
        }

        if (commandsList[input]) {
            console.log('ok');
            executeCommandByName(input, window);
        } else {
            if (input != '')
                printError('notFound');
        }

        return 1;
    },

    handleCommandInput: function(input, callback) {
        $.getJSON(commands_list_path, function(data) {
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
        initTerminalListener();

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
        // var args = [].slice.call(arguments).splice(2);
        // var namespaces = commandName.split(".");
        // var func = namespaces.pop();
        //
        // for (var i = 0; i < namespaces.length; i++) {
        //     context = context[namespaces[i]];
        // }

        return window[commandName]();
    }
}

module.exports = terminal;
