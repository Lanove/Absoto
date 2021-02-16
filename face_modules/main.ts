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
  elonDescriptor = new Float32Array(Object.values(JSON.parse(elon.toString())));
const labeledDescriptors = [
  new faceapi.LabeledFaceDescriptors("Elon", [elonDescriptor]),
];
console.log(elonDescriptor);
const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

/* 
 * This function generate faceDescriptor for every image that is on face_modules/known_faces into face_modules/out json of Float32Array
*/
async function generateDescriptor(){
  await faceNet.loadFromDisk("./face_modules/models");
  await faceLandmark68Net.loadFromDisk("./face_modules/models");
  await faceRecognitionNet.loadFromDisk("./face_modules/models");
  let images = [];
  images = fileManager.listFile("./face_modules/known_faces", (error) => {
    throw error;
  });
  images.forEach(async function(fileName){
    const img = await canvas.loadImage(`./face_modules/known_faces/${fileName}`);
    const detections = await faceapi
      .detectSingleFace(img, faceOption)
      .withFaceLandmarks()
      .withFaceDescriptor();
    const descriptor = JSON.stringify(detections.descriptor);
    fileManager.saveFile(`./face_modules/out/${fileName.split(".")[0]}.json`, Buffer.from(descriptor, "utf8"));
    console.log(`generating descriptor for ${fileName} complete`);
  });
}

async function run() {
  await faceNet.loadFromDisk("./face_modules/models");
  await faceLandmark68Net.loadFromDisk("./face_modules/models");
  await faceRecognitionNet.loadFromDisk("./face_modules/models");

  // const detections = await faceapi.detectSingleFace(img, faceOption).withFaceLandmarks().withFaceDescriptor();
  // const descriptor = JSON.stringify(detections.descriptor);
  // saveFile(`./face_modules/out/${filename}`,Buffer.from(descriptor,"utf8"));

  // faceRecognition and output to image
  // const results = await faceapi
  //   .detectAllFaces(img, faceOption)
  //   .withFaceLandmarks()
  //   .withFaceDescriptors();
  // const queryDrawBoxes = results.map(res => {
  //   const bestMatch = faceMatcher.findBestMatch(res.descriptor)
  //   return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
  // })
  // const outQuery = faceapi.createCanvasFromMedia(img)
  // queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
  // fileManager.saveFile('./face_modules/queryImage.jpg', (outQuery as any).toBuffer('image/jpeg'))

  // faceDescriptor picker
  // const detections = await faceapi.detectSingleFace(img, faceOption).withFaceLandmarks().withFaceDescriptor();
  // const descriptor = JSON.stringify(detections.descriptor);
  // saveFile("elon.json",Buffer.from(descriptor,"utf8"));

  console.log(`done in ${Date.now() - startTime}ms`);
}
generateDescriptor();
startTime = Date.now();
// run();
