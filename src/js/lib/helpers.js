var helpers = {

    // TODO
    getParentLevel: function(tree, needle) {
        Object.keys(tree).forEach(function(element) {
            if (element == needle) return tree[element];
            if (typeof tree[element] == 'object') helpers.getParentLevel(tree[element], needle);

            return tree[element];
        });
    }

}

module.exports = helpers;
