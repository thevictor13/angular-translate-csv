# angular-translate-csv-to-json

A CLI build tool to generate JSON files required by Angular Translate from a single CSV file

[![npm version](https://badge.fury.io/js/angular-translate-csv-to-json.svg)](https://www.npmjs.com/package/angular-translate-csv-to-json)

## Installation

``` bash
npm install angular-translate-csv-to-json --save-dev
```

## Overview

This is a lightweight, dependency-free command line build tool that converts CSV/TSV files to JSON files Angular Translate can consume during runtime. This enables you to have a single table of translations containing all supported languages. This tool also supports namespacing, so keys like `users.create.labelFirstName` will produce a nested JSON structure.

## Example CSV input

id                                        | en                                     | fr
----------------------------------------- | -------------------------------------- | -------------------------------------------
users.create.labelFirstName               | First Name                             | Prénom
users.create.labelLastName                | Last Name                              | Nom
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
        "toastValidationEmailSentToUserEmail": "E-mail de validation envoyé à {{userEmail}}"
    }
}
```

Note: Output JSON will not be pretty-printed as above, but compact.

## Usage


``` bash
node node_modules/angular-translate-csv-to-json config/angular-translate-csv-to-json.config.json
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
    "csvFieldSeparator": "\t"
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

#### `csvFieldSeparator`
Type: `String`

Field separator of input CSV file.
