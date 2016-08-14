var fs = require('fs');
var path = require('path');

module.exports = {
    ensureDirectoryExistence: ensureDirectoryExistence
}

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
        return;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function directoryExists(dirname) {
    try {
        return fs.statSync(dirname).isDirectory();
    }
  catch (err) {
        return false;
    }
}
