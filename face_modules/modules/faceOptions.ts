import * as faceapi from "face-api.js";
let faceNet = faceapi.nets.ssdMobilenetv1,
  minConfidence = 0.5,
  faceOption = new faceapi.SsdMobilenetv1Options({ minConfidence });

export {faceNet,faceOption};