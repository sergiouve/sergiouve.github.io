var helpers = require('./lib/helpers.js');
var fileTree = require('./lib/tree.json');
var commandsList = require('./lib/commands.json');

var commands = {

    fileTree: fileTree,
    currentDir: fileTree['/']['home'],
    commandsList: commandsList,
    helpers: helpers,

    listDirectory: function(parameters) {

        if (parameters.length > 0) {
            var directory_path = parameters[0];
            var directorList = directory_path.split('/');
            var tempDir = this.currentDir;
            var directory = '';

            while (directorList.length > 0) {
                tempDir = tempDir[directorList[0]];
                directorList.splice(0, 1);
            }

            if (typeof directory != 'object') {
                return directory_path + ' is not a folder';
            }

            directory = Object.keys(tempDir);
            delete tempDir;

        } else {
            directory = Object.keys(this.currentDir);
        }

        directory = directory.toString();
        directory = directory.replace(/,/g, '&nbsp;&nbsp;');

        return directory;
    },

    changeDirectory: function(parameters) {
        var directoryPath = parameters[0].split('/');
        var directory = directoryPath[0];

        // TODO
        if (directory == '..') {
            var parent = this.helpers.getJSONParentLevel(this.fileTree, this.currentDir);
            return;
        }

        if (typeof this.currentDir[directory] != 'object') {
            return directory + ' is not a folder';
        }

        this.currentDir = this.currentDir[directory];
        directoryPath.splice(0, 1);

        if (directoryPath.length > 0) {
            this.changeDirectory([directoryPath.join('/')]);
        }

        return '';
    },

    printWorkingDirectory: function() {

    },

    concatenate: function(parameters) {
        var file = parameters[0];

        if (typeof this.currentDir[file] != 'string') {
            return file + ' is not a file';
        }

        return this.currentDir[file];
    },

    help: function() {
        var output = 'commands available:<br>';

        for (command in commandsList) {
            output += command + '<br>';
        }

        return output;
    },

    startx: function() {
        window.location.href = window.location.href + 'startx.html';
    }
};

module.exports = commands;
