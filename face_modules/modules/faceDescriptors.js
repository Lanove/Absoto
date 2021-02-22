"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.loadFaceMatcher = exports.loadDescriptor = exports.generateDescriptor = void 0;
require("@tensorflow/tfjs-node");
var canvasPatch_1 = require("./canvasPatch");
var fileManager = require("./saveFile");
var faceapi = require("face-api.js");
var faceOptions_1 = require("./faceOptions");
/*
 * This function generate faceDescriptor for every image that is on face_modules/known_faces into face_modules/out json of Float32Array
 */
function generateDescriptor() {
    return __awaiter(this, void 0, void 0, function () {
        var images;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, faceOptions_1.faceNet.loadFromDisk("./face_modules/models")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, faceOptions_1.faceLandmark68Net.loadFromDisk("./face_modules/models")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, faceOptions_1.faceRecognitionNet.loadFromDisk("./face_modules/models")];
                case 3:
                    _a.sent();
                    images = [];
                    return [4 /*yield*/, fileManager.listFile("./face_modules/known_faces", function (error) {
                            throw error;
                        })];
                case 4:
                    images = _a.sent();
                    return [4 /*yield*/, images.forEach(function (fileName) {
                            return __awaiter(this, void 0, void 0, function () {
                                var img, detections, stringedDescriptor;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, canvasPatch_1.canvas.loadImage("./face_modules/known_faces/" + fileName)];
                                        case 1:
                                            img = _a.sent();
                                            return [4 /*yield*/, faceapi
                                                    .detectSingleFace(img, faceOptions_1.faceOption)
                                                    .withFaceLandmarks()
                                                    .withFaceDescriptor()];
                                        case 2:
                                            detections = _a.sent();
                                            if (detections) {
                                                stringedDescriptor = JSON.stringify(detections.descriptor);
                                                fileManager.saveFile("./face_modules/out/" + fileName.split(".")[0] + ".json", Buffer.from(stringedDescriptor, "utf8"));
                                                console.log("\x1b[32m", "Generating descriptor for " + fileName + " complete, saved at ./face_modules/out/" + fileName.split(".")[0] + ".json");
                                            }
                                            else
                                                console.log("\x1b[31m", "Failed Generating descriptor for " + fileName);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateDescriptor = generateDescriptor;
/*
 * Load every json file of faceDescriptor from ./face_modules/out/ and return as F32Array of faceDescriptor
 */
function loadDescriptor() {
    var passedDescriptor = [];
    fileManager.readMultipleFiles("./face_modules/out/", function (filename, content) {
        var descriptorRaw = new Float32Array(Object.values(JSON.parse(content.toString()))), descriptor = new faceapi.LabeledFaceDescriptors(filename.split(".")[0], [descriptorRaw]);
        passedDescriptor.push(descriptor);
    }, function (err) {
        throw err;
    });
    return passedDescriptor;
}
exports.loadDescriptor = loadDescriptor;
function loadFaceMatcher() {
    return new faceapi.FaceMatcher(loadDescriptor());
}
exports.loadFaceMatcher = loadFaceMatcher;
