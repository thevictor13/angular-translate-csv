var fs = require('fs');
var path = require('path');
var Config = require(path.resolve(process.cwd(), process.argv[2]));
var CsvParser = require('./csv-parser');
var DirManager = require('./dir-manager');

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
                var filePath = path.resolve(process.cwd(), Config.jsonDirOut, Config.jsonFileName + '.' + language + '.' + Config.jsonExt);
                
                (function (translations, filePath) {
                    DirManager.ensureDirectoryExistence(filePath);
                    
                    fs.writeFile(filePath, JSON.stringify(translations), function (error) {
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
