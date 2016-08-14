if (process.argv[2] === undefined) {
    console.error("Compulsory parameter missing. Please specify a config file.");
    return;
}

var Controller = require('./controller');
Controller.generateJson();
