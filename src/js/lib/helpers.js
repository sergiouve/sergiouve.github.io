var helpers = {

    getParentLevel: function(tree, needle) {
        for (level in tree) {

            if (level == needle)
                return tree[level];

            if (typeof tree[level] == 'object') {
                this.getParentLevel(tree[level], needle);
            } else {
                this.getParentLevel(tree, needle);
            }

        }
    }

}

module.exports = helpers;
