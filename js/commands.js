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
