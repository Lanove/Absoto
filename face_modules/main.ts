import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import {canvas} from "./modules/canvasPatch";
import {saveFile} from "./modules/saveFile";
import {faceNet,faceOption} from "./modules/faceOptions";
import * as faceapi from "face-api.js";

let startTime;
async function run() {
  await faceNet.loadFromDisk("./face_modules/models");

  const img = await canvas.loadImage("./face_modules/images/wa.jpeg");
  const detections = await faceapi.detectAllFaces(img, faceOption);

  const out = faceapi.createCanvasFromMedia(img) as any;
  faceapi.draw.drawDetections(out, detections);

  saveFile("faceDetection.jpg", out.toBuffer("image/jpeg"));
  console.log(`done in ${Date.now()-startTime}ms, saved results to out/faceDetection.jpg`);
}
startTime = Date.now();
run();