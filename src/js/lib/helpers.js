var helpers = {

  // TODO
  getParentFolder: function(tree, pathList) {
    var needle = pathList[pathList.length - 1];

    for (level in tree) {
      if (level == needle) {
        return tree[level];
      } else if (!!tree[level] && typeof (tree[level]) == "object") {
        console.log(level, tree[level])
        helpers.getParentFolder(tree[level], pathList);
      }
    }
  },

  updateCurrentPath: function(currentPath, directory) {
    currentPath.push(directory);

    return currentPath;
  },

  formatCurrentPathString: function(currentPath) {
    currentPath = currentPath.toString();
    currentPath = currentPath.replace(/,/g, '/');
    currentPath = currentPath.replace(/\/\//g, '/');

    return currentPath;
  }

}

module.exports = helpers;
