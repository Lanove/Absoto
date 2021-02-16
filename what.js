"use strict";
exports.__esModule = true;
exports.canvas = void 0;
var canvas = require('canvas');
exports.canvas = canvas;
var faceapi = require("face-api.js");
var Canvas = canvas.Canvas, Image = canvas.Image, ImageData = canvas.ImageData;
faceapi.env.monkeyPatch({ Canvas: Canvas, Image: Image, ImageData: ImageData });
