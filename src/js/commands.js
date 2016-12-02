var fileTree = require('./lib/tree.json');

var commands = {

    currentDir: fileTree['/']['home'],

    listDirectory: function(parameters) {

        if (parameters.length > 0) {
            var directory = Object.keys(this.currentDir[parameters[0]]);
        } else {
            var directory = Object.keys(this.currentDir);
        }
        directory = directory.toString();
        directory = directory.replace(/,/g, '&nbsp;&nbsp;');

        return directory;
    },

    changeDirectory: function(parameters) {
        var directoryPath = parameters[0].split('/');
        var directory = directoryPath[0];

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
        console.log(typeof this.currentDir[file]);

        if (typeof this.currentDir[file] != 'string') {
            return file + ' is not a file';
        }

        return this.currentDir[file];
    },

    help: function() {
        var output = 'commands available:<br>';
        output += '';

        return output;
    }
};

module.exports = commands;
