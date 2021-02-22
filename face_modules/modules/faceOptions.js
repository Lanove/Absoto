"use strict";
exports.__esModule = true;
exports.faceOption = exports.faceRecognitionNet = exports.faceLandmark68Net = exports.faceNet = void 0;
var faceapi = require("face-api.js");
var faceNet = faceapi.nets.ssdMobilenetv1, faceLandmark68Net = faceapi.nets.faceLandmark68Net, faceRecognitionNet = faceapi.nets.faceRecognitionNet, minConfidence = 0.5, faceOption = new faceapi.SsdMobilenetv1Options({ minConfidence: minConfidence });
exports.faceNet = faceNet;
exports.faceLandmark68Net = faceLandmark68Net;
exports.faceRecognitionNet = faceRecognitionNet;
exports.faceOption = faceOption;
