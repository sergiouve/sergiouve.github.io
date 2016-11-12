(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var terminal = require('./terminal.js');

$(document).ready(function() {
    terminal.initTerminalListener();
});

},{"./terminal.js":3}],2:[function(require,module,exports){
var commands = {
    listDirectory: function() {
        console.log('executing list directory');
        return 'about mock_directory';
    },

    changeDirectory: function() {
        console.log('executing change directory');
    }
};

module.exports = commands;

},{}],3:[function(require,module,exports){
var commands = require('./commands');

var terminal = {

    commands_list_path: '/lib/commands.json',
    $app: $('#terminal'),

    terminalHandleInput: function(input, pressed_key) {
        if (pressed_key == '13') {
            this.handleCommandInput(input, this.executeTerminalCommand);
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

        if (is_a_yodo_command) {
            return;
        }

        if (commandsList[input]) {
            var output = terminal.executeCommandByName(commandsList[input]);
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

    updateCommandHistory: function(input) {
        return 1;
    },

    askYodo: function() {
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

    executeCommandByName: function(input) {
        return commands[input]();
    }
}

module.exports = terminal;

},{"./commands":2}]},{},[1]);
