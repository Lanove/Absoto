import * as faceapi from "face-api.js";
let faceNet = faceapi.nets.ssdMobilenetv1,
    faceLandmark68Net = faceapi.nets.faceLandmark68Net,
    faceRecognitionNet = faceapi.nets.faceRecognitionNet,
  minConfidence = 0.5,
  faceOption = new faceapi.SsdMobilenetv1Options({ minConfidence });

export {faceNet,faceLandmark68Net,faceRecognitionNet,faceOption};