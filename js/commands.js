var fileTree = require('./../lib/tree.json');

var commands = {

    currentDir: fileTree['/'],

    listDirectory: function(parameters) {

        if (parameters.length > 0) {
            var directory = Object.keys(this.currentDir[parameters[0]]);
        } else {
            var directory = Object.keys(this.currentDir);
        }

        directory = directory.toString();
        directory = directory.replace(',', '  ');

        return directory;
    },

    changeDirectory: function(parameters) {
        var directory = parameters[0];
        console.log(typeof directory);

        if (typeof directory == 'object') {
            return 'not a folder';
        }

        this.currentDir = this.currentDir[directory];
        return '';
    },

    printWorkingDirectory: function() {

    },

    help: function() {
        var output = 'commands available:<br>';
        output += '';

        return output;
    }
};

module.exports = commands;
