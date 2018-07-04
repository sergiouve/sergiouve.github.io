var terminal = require('./terminal.js');
var commandsList = require('./lib/commands.json');

$(document).ready(function() {

    var showHelpModal = function() {
        console.log('test 2');
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $modalSection.find('.js-help-container');

        $modalSection.show();
        $modalHelpBox.animate({
            top: '+=900'
        }, 400);
    };

    var hideHelpModal = function() {
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $modalSection.find('.js-help-container');

        $modalHelpBox.animate({
            top: '-=900'
        }, 400);
        $modalSection.hide();
    };

    var populateCommandsList = function() {
        var $modalHelpBox = $('.js-help-container');
        var $commandsListElement = $modalHelpBox.find('.js-commands-list');

        for (command in commandsList) {
            if (commandsList.hasOwnProperty(command)) {
                var liElement = '<li><strong>' + command + '</strong>: ' + commandsList[command] + '</li>';
                $commandsListElement.append(liElement);
            }
        }
    };

    var initModalListeners = function() {
        var $helpButton = $('.js-help');
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $('.js-help-container');

        $helpButton.on('click', function(e) {
            e.preventDefault();
            showHelpModal();
        });

        $modalSection.on('click', function() {
            hideHelpModal();
        });

        $modalHelpBox.on('click', function(e) {
            e.stopPropagation();
        });

        populateCommandsList();
    };

    var randomizeJob = function() {
      var jobs = [
        'Rainbow Engineer',
        'Pet Detective',
        'Wannabe Pirate',
        'Monkey Coder',
        'Ex KGB',
        'That Dude'
      ];

      var job_title = jobs[Math.floor(Math.random() * jobs.length)];
      var $jobSpan = $('.js-job-title');

      $jobSpan.html(job_title);
    };

    initModalListeners();
    randomizeJob();
    terminal.initTerminalListener();
});
