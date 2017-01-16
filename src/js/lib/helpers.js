var helpers = {

    getParentLevelName: function(tree, needle) {
        for (level in tree) {
            if (tree[level] == needle) {
                return tree[level];
            } else {
                this.getParentLevelName(tree[level], needle);
            }
        }
    }

}

module.exports = helpers;
