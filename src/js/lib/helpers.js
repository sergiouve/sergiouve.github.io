var helpers = {

    // TODO
    getJSONParentLevel: function(tree, needle) {
        Object.keys(tree).forEach(function(element) {
            if (element == needle) return tree[element];
            if (typeof tree[element] == 'object') helpers.getJSONParentLevel(tree[element], needle);

            return tree[element];
        });
    }

}

module.exports = helpers;
