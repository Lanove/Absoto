import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import { canvas } from "./canvasPatch";
import * as fileManager from "./saveFile";
import * as faceapi from "face-api.js";
import {
  faceNet,
  faceLandmark68Net,
  faceRecognitionNet,
  faceOption,
} from "./faceOptions";

/*
 * This function generate faceDescriptor for every image that is on face_modules/known_faces into face_modules/out json of Float32Array
 */
export async function generateDescriptor() {
  await faceNet.loadFromDisk("./face_modules/models");
  await faceLandmark68Net.loadFromDisk("./face_modules/models");
  await faceRecognitionNet.loadFromDisk("./face_modules/models");
  let images = [];
  images = await fileManager.listFile("./face_modules/known_faces", (error) => {
    throw error;
  });
  await images.forEach(async function (fileName) {
    const img = await canvas.loadImage(
      `./face_modules/known_faces/${fileName}`
    );
    const detections = await faceapi
      .detectSingleFace(img, faceOption)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (detections) {
      const stringedDescriptor = JSON.stringify(detections.descriptor);
      fileManager.saveFile(
        `./face_modules/out/${fileName.split(".")[0]}.json`,
        Buffer.from(stringedDescriptor, "utf8")
      );
      console.log(
        "\x1b[32m",
        `Generating descriptor for ${fileName} complete, saved at ./face_modules/out/${
          fileName.split(".")[0]
        }.json`
      );
    } else console.log("\x1b[31m", `Failed Generating descriptor for ${fileName}`);
  });
}

/*
 * Load every json file of faceDescriptor from ./face_modules/out/ and return as F32Array of faceDescriptor
 */
export function loadDescriptor(): faceapi.LabeledFaceDescriptors[] {
  let passedDescriptor: faceapi.LabeledFaceDescriptors[] = [];
  fileManager.readMultipleFiles(
    "./face_modules/out/",
    (filename, content) => {
      const descriptorRaw = new Float32Array(
          Object.values(JSON.parse(content.toString()))
        ),
        descriptor = new faceapi.LabeledFaceDescriptors(
          filename.split(".")[0],
          [descriptorRaw]
        );
      passedDescriptor.push(descriptor);
    },
    (err) => {
      throw err;
    }
  );
  return passedDescriptor;
}

export function loadFaceMatcher(): faceapi.FaceMatcher {
  return new faceapi.FaceMatcher(loadDescriptor());
}
