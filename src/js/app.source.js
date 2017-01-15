var terminal = require('./terminal.js');

$(document).ready(function() {

    var showHelpModal = function() {
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $modalSection.find('.js-help-container');

        $modalSection.show();
        $modalHelpBox.animate({
            top: '+=900'
        }, 400);
    };

    var hideHelpModal = function() {

    }

    var initHelpButton = function() {
        var $helpButton = $('.js-help');

        $helpButton.on('click', function() {
            showHelpModal();
        });
    };

    initHelpButton();
    terminal.initTerminalListener();
});
