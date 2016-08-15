# angular-translate-csv

A CLI build tool to generate JSON files required by Angular Translate from a single CSV file

## Overview

This is a lightweight, dependency-free command line build tool that converts CSV/TSV files to JSON files Angular Translate can consume during runtime. This enables you to have a single table of translations containing all supported languages. This tool also supports namespacing, so keys like `users.create.labelFirstName` will produce a nested JSON structure. Text delimiters are not currently supported.

## Example CSV input

id                                        | en                                     | fr
----------------------------------------- | -------------------------------------- | -------------------------------------------
users.create.labelFirstName               | First Name                             | Prénom
users.create.labelLastName                | Last Name                              | Nom
users.dialogtitleConfirmAction            | Confirm action                         | Confirmer action
users.toastValidationEmailSentToUserEmail | Validation email sent to {{userEmail}} | E-mail de validation envoyé à {{userEmail}}

## Example JSON output


### English:

``` json
{
    "users": {
        "create": {
            "labelFirstName": "First Name",
            "labelLastName": "Last Name"
        },
        "dialogtitleConfirmAction": "Confirm action",
        "toastValidationEmailSentToUserEmail": "Validation email sent to {{userEmail}}"
    }
}
```

### French:

``` json
{
    "users": {
        "create": {
            "labelFirstName": "Prénom",
            "labelLastName": "Nom"
        },
        "dialogtitleConfirmAction": "Confirmer action",
        "toastValidationEmailSentToUserEmail": "E-mail de validation envoyé à {{userEmail}}"
    }
}
```

Note: Output JSON will not be pretty-printed as above, but compact.

## Installation

``` bash
npm install angular-translate-csv --save-dev
```

## Usage


``` bash
node node_modules/angular-translate-csv config/angular-translate-csv.config.json
```

The first (and only) parameter is the path to a config file, which is required.

## Configuration:

This is an example configuration you can adapt to your needs:
``` json
{
    "csvFileIn": "src/angular/i18n/translations.tsv",
    "jsonDirOut": "src/angular/i18n",
    "jsonFileName": "translations",
    "jsonExt": "json",
    "jsonIgnoreEmptyString": true,
    "jsonReplace": { "''": "\"" },
    "csvFieldSeparator": "\t",
    "csvEol": "\n",
    "csvEolAlt": ["\r\n", "\r"]
}
```

### Options

#### `csvFileIn`
Type: `String`

The path to the input CSV file to be processed.

#### `jsonDirOut`
Type: `String`

Output directory to store the generated JSON files in.

#### `jsonFileName`
Type: `String`

The first part of the JSON file name. The file name is constructed as the following: `{jsonFileName}.{languageCode}.{jsonFileExt}` (e.g. `translations.en.json`, `translations.fr.json`, etc.)

#### `jsonFileExt`
Type: `String`

The extension of the generated JSON file.

#### `jsonIgnoreEmptyString`
Type: `Boolean`

`true`: Do not generate JSON entries for empty CSV cells.

`false`: Generate JSON entries for empty CSV cells.

#### `jsonReplace`
Type: `Object`

This is a map of key-value pairs. All keys found in the CSV input will be replaced by their values before storing the results in the JSON files. This can be useful if for some reason you must substitute a character.
As an example, GitHub does not accept double-quotes when not using a text delimiter.

If you do not need this functionality, just set it as `{}`

#### `csvFieldSeparator`
Type: `String`

Field separator of input CSV file.

#### `csvEol`
Type: `String`

End of line character of input CSV file.

#### `csvEolAlt`
Type: `Array`

Alternate end of line characters of input CSV file. These characters will also be treated as end of line markers. Useful for teams using different Operating Systems.
