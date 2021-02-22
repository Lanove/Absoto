"use strict";
exports.__esModule = true;
exports.listFile = exports.readMultipleFiles = exports.readFile = exports.saveFile = void 0;
var fs = require("fs");
var path = require("path");
var baseDir = path.resolve(__dirname, "../../");
function saveFile(fileName, buf) {
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }
    fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}
exports.saveFile = saveFile;
function readFile(fileName) {
    return fs.readFileSync(path.resolve(baseDir, fileName));
}
exports.readFile = readFile;
function readMultipleFiles(dirNameRelative, onFileContent, onError) {
    var dirname = path.resolve(baseDir, dirNameRelative);
    fs.readdirSync(dirname).forEach(function (filename) {
        onFileContent(filename, fs.readFileSync(path.resolve(dirname, filename)));
    });
}
exports.readMultipleFiles = readMultipleFiles;
function listFile(dirNameRelative, onError) {
    var dirname = path.resolve(baseDir, dirNameRelative);
    return fs.readdirSync(dirname);
}
exports.listFile = listFile;
