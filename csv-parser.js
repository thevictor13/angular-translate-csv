var path = require('path');
var Config = require(path.resolve(process.cwd(), process.argv[2]));

module.exports = {
    processCsv: processCsv
}

function processCsv(fileContents) {
    if (!fileContents) {
        return {};
    }

    var to = {};

    var csvToArray = CSVToArray(fileContents, Config.csvFieldSeparator);
    var languages = csvToArray[0];
    languages.shift();

    var datas = [];
    for (var i = 1; i < csvToArray.length; i++) {
        if (csvToArray[i].length <= 1) {
            continue;
        }
        var translations = csvToArray[i];
        var propertyPath = translations.shift();

        for (var j = 0; j < languages.length; j++) {
            datas.push([languages[j] + "." + propertyPath, translations[j]]);
        }
    }

    for (var i = 0; i < datas.length; i++) {
        createJsonPropertyByPath(to, datas[i][0], datas[i][1])
    }

    return to;
}

function createJsonPropertyByPath(obj, path, value) {
    if (typeof path == 'string')
        return createJsonPropertyByPath(obj, path.split('.'), value);
    else if (path.length == 1 && value !== undefined)
        return obj[path[0]] = value;
    else if (path.length == 0)
        return obj;
    if (obj[path[0]] == undefined)
        obj[path[0]] = {}
    if (typeof obj[path[0]] == 'string')
        throw new Error(path[0] + " is a value");
    return createJsonPropertyByPath(obj[path[0]], path.slice(1), value);
}

//https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
        ) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}