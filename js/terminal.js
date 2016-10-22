
var initTerminalListener = function() {
        var $terminal = $main.find('.terminal-input:last-child');

        $terminal.on('keyup', function(e) {
            var pressed_key = e.keyCode || e.which;
            terminalHandleInput($terminal.val(), pressed_key);
        });
    }

var focusTerminal = function() {
    var $terminal = $main.find('.terminal-input:last-child');
    $terminal.focus();
}

var terminalHandleInput = function(input, pressed_key) {
    if (pressed_key == '13') {
        executeTerminalCommand(input);
        generateNewTerminalLine();
        updateCommandHistory(input);
        return;
    } else {
        // TODO
        return;
    }
}

var executeTerminalCommand = function(input) {
    askYodo();
    return 1;
}

var generateNewTerminalLine = function() {
    var $terminalBox = $main.find('.js-terminal-box:last-child');
    var $terminalInput = $terminalBox.find('input');

    $terminalBox.clone().insertAfter($terminalBox);
    $terminalInput.prop('disabled', true);

    var $terminalBox = $main.find('.js-terminal-box:last-child');
    var $terminalInput = $terminalBox.find('input');

    initTerminalListener();
    $terminalInput.val('');
    $terminalInput.focus();

    return 1;
}

var updateCommandHistory = function(input) {
    return 1;
}

var askYodo = function() {
        return 1;
    }
