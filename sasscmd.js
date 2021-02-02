// This script will run on every save of .scss files, to compile scss to css.
// uses node-sass, colors npm dependencies 
// and use Run on Save vscode extension by emeraldwalk (the config for run on save is on settings.json on .vscode folder)

let fs = require('fs');
let path = require('path');
let sass = require('node-sass');
let colors = require('colors/safe');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
  });

let compilerConfigFilePath = path.resolve(__dirname, 'compilerconfig.json');
let compilerConfig = require(compilerConfigFilePath);

function addMinExtension(fileName) {
    return fileName.substr(0, fileName.lastIndexOf(".")) + ".min.css";
}

function parseConfigItem(item) {
    if (!item || !item.inputFile || !item.outputFile) {
        let invalidItem = (item && item.inputFile) || 'item';
        console.log(colors.warn("Ignoring invalid " + invalidItem + ' in ' + compilerConfigFilePath));
        return null;
    }

    return {
        'inputFile': item.inputFile,
        'outputFile': item.outputFile,
        'outputFileMinified': addMinExtension(item.outputFile),
    };
}

function saveFile(dataToSave, filePath, message, callback) {
    fs.unlink(filePath, (err) => {

        if (err && err.code !== 'ENOENT')
            throw err;

        let options = { flag : 'w' };
        fs.writeFile(filePath, dataToSave, options, (err) => {
            if (err) 
                console.log(colors.error(err));
            else {
                console.log(colors.info(message));
                callback && callback();
            }
        });
    });
}

function compileFile(file, minified) {
    if (!file)
        return;
    
    let outputStyle = minified ? 'compressed' : 'expanded';
    let sourceMap = minified;
    let sourceMapEmbed = !minified;
    let outputFileName = minified ? file.outputFileMinified : file.outputFile;

    let result = sass.render({
        file: file.inputFile,
        outputStyle: outputStyle,
        outFile: outputFileName,
        sourceMap: sourceMap, 
        sourceMapEmbed: sourceMapEmbed
    }, (error, result) => {
        if (error) {
            let errorToLog = error.formatted || error;
            console.log(colors.error(errorToLog));
        }
        else {
            let outputFilePath = path.resolve(__dirname, outputFileName);
            let compiledMessage = 'Saved compiled file ' + outputFileName;
            saveFile(result.css.toString(), outputFilePath, compiledMessage);
            
            if (result.map) {
                let mapFileName = outputFileName + '.map';
                let savedMessage = 'Saved map file ' + mapFileName;
                saveFile(result.map.toString(), mapFileName, savedMessage)
            }
        }});
}

let files = compilerConfig.map(x => parseConfigItem(x));

files.forEach((file) => {
    compileFile(file, false);
    compileFile(file, true);
});