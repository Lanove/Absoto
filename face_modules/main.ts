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
console.log("script start");
let startTime;

const elon = fileManager.readFile("./face_modules/out/elon.json"),
    elonDescriptor = new Float32Array(Object.values(JSON.parse(elon.toString())));;
const labeledDescriptors = [
  new faceapi.LabeledFaceDescriptors("Elon", [elonDescriptor]),
];
console.log(elonDescriptor);
const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

async function run() {
  let images = [];
  await faceNet.loadFromDisk("./face_modules/models");
  await faceLandmark68Net.loadFromDisk("./face_modules/models");
  await faceRecognitionNet.loadFromDisk("./face_modules/models");

  // saveFile.readMultipleFiles("dick","ass","shit");
  // console.log(images);
  const img = await canvas.loadImage(`./images/elonandboi.jpg`);
  // const detections = await faceapi.detectSingleFace(img, faceOption).withFaceLandmarks().withFaceDescriptor();
  // const descriptor = JSON.stringify(detections.descriptor);
  // saveFile(`./face_modules/out/${filename}`,Buffer.from(descriptor,"utf8"));

  // faceRecognition and output to image
  const results = await faceapi
    .detectAllFaces(img, faceOption)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const queryDrawBoxes = results.map(res => {
    const bestMatch = faceMatcher.findBestMatch(res.descriptor)
    return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
  })
  const outQuery = faceapi.createCanvasFromMedia(img)
  queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
  fileManager.saveFile('./face_modules/queryImage.jpg', (outQuery as any).toBuffer('image/jpeg'))

  // faceDescriptor picker
  // const detections = await faceapi.detectSingleFace(img, faceOption).withFaceLandmarks().withFaceDescriptor();
  // const descriptor = JSON.stringify(detections.descriptor);
  // saveFile("elon.json",Buffer.from(descriptor,"utf8"));

  console.log(`done in ${Date.now()-startTime}ms`);
}

console.log("calling run()");
startTime = Date.now();
run();
