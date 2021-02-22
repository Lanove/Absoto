import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import { canvas } from "./modules/canvasPatch";
import * as fileManager from "./modules/saveFile";
import {
  faceNet,
  faceLandmark68Net,
  faceRecognitionNet,
  faceOption,
} from "./modules/faceOptions";
import * as faceapi from "face-api.js";
import * as faceDescriptor from "./modules/faceDescriptors"
let startTime;

// faceDescriptor.generateDescriptor();
let faceMatcher = faceDescriptor.loadFaceMatcher();

async function run() {
  await faceNet.loadFromDisk("./face_modules/models");
  await faceLandmark68Net.loadFromDisk("./face_modules/models");
  await faceRecognitionNet.loadFromDisk("./face_modules/models");

  // faceRecognition and output to image
  const img = await canvas.loadImage(`./images/elonandboi.jpg`);
  const results = await faceapi
    .detectAllFaces(img, faceOption)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const queryDrawBoxes = results.map(res => {
    const bestMatch = faceMatcher.findBestMatch(res.descriptor)
    console.log(bestMatch.toString());
    // return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
  })
  // const outQuery = faceapi.createCanvasFromMedia(img)
  // queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
  // fileManager.saveFile('./face_modules/queryImage.jpg', (outQuery as any).toBuffer('image/jpeg'))

  console.log(`done in ${Date.now() - startTime}ms`);
}

startTime = Date.now();
run();
