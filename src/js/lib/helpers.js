var helpers = {

    // TODO
    getJSONParentLevel: function(tree, needle) {
        if(needle !== true) {
            console.log('setting marker');
            // !! Im setting the marker in needle but I need it on tree...
            needle['..'] = '..';
            needle = true;
            helpers.getJSONParentLevel(tree, needle);
        } else {
            Object.keys(tree).forEach(function(element) {
                console.log('iterating');
                if (element.hasOwnProperty('..')) {
                    console.log('marker found');
                    delete element['..'];
                    return tree;
                } else {
                    console.log('calling me self');
                    helpers.getJSONParentLevel(tree[element], needle);
                }
            });
        }
    }

}

module.exports = helpers;
