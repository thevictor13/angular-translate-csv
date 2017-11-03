var fs = require('fs');
var path = require('path');
var Config = require(path.resolve(process.cwd(), process.argv[2]));
var CsvParser = require('./csv-parser');
var DirManager = require('./dir-manager');
var StringCheck = require('./string-check');
var JsonFormat = require('./json-format');

module.exports = {
    generateJson: generateJson
}

function generateJson() {

    fs.readFile(path.resolve(process.cwd(), Config.csvFileIn), { encoding: 'utf8' }, function (error, fileContents) {
        if (error) {
            console.error("Error opening CSV file: " + error.message);
            return;
        }
        var to = CsvParser.processCsv(fileContents);

        for (var language in to) {
            if (to.hasOwnProperty(language)) {
                var translations = to[language];
                var fileName = (StringCheck.isNullOrWhitespace(Config.jsonFileName) ? "" : Config.jsonFileName + '.') + language + (StringCheck.isNullOrWhitespace(Config.jsonExt) ? "" : '.' + Config.jsonExt);
                var filePath = path.resolve(process.cwd(), Config.jsonDirOut, fileName);

                (function (translations, filePath) {
                    DirManager.ensureDirectoryExistence(filePath);
                    var jsonContent = JsonFormat(translations);

                    fs.writeFile(filePath, jsonContent, function (error) {
                        if (error) {
                            console.error('write error:  ' + error.message);
                        }
                        else {
                            console.log('Translation JSON file generated at ' + filePath);
                        }
                    });
                })(translations, filePath);
            }
        }
    });
}