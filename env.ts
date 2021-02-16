const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const canvas = require("canvas");
import * as faceapi from "face-api.js";
import * as fs from "fs";
import * as path from "path";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
let faceNet = faceapi.nets.ssdMobilenetv1,
  minConfidence = 0.5,
  faceOption = new faceapi.SsdMobilenetv1Options({ minConfidence });

const baseDir = path.resolve(__dirname, "./out");

function saveFile(fileName: string, buf: Buffer) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }
  fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}

async function run() {
  await faceNet.loadFromDisk("./weights");

  const img = await canvas.loadImage("./images/bbt4.jpg");
  const detections = await faceapi.detectAllFaces(img, faceOption);

  const out = faceapi.createCanvasFromMedia(img) as any;
  faceapi.draw.drawDetections(out, detections);

  saveFile("faceDetection.jpg", out.toBuffer("image/jpeg"));
  console.log("done, saved results to out/faceDetection.jpg");
}
run();
