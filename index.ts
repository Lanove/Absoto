import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import { canvas } from "./face_modules/modules/canvasPatch";
import * as fileManager from "./face_modules/modules/saveFile";
import {
  faceNet,
  faceLandmark68Net,
  faceRecognitionNet,
  faceOption,
} from "./face_modules/modules/faceOptions";
import * as faceapi from "face-api.js";
import * as faceDescriptor from "./face_modules/modules/faceDescriptors";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

const bodyParser = require("body-parser");
let multer = require("multer"),
  upload = multer({ dest: "temp/" }),
  faceMatcher = faceDescriptor.loadFaceMatcher();

const networkInterfaces = os.networkInterfaces(),
  express = require("express"),
  app = express(),
  ip = networkInterfaces["Wi-Fi"][1]["address"].toString(),
  localhost = "localhost",
  port = 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/recognizeFace", upload.single("imageFile"), (req, res) => {
  res.set("Connection", "keep-alive");
  res.set("Content-Type", "application/json");
  console.log(req.headers);
  console.log(req.file);
  if (req.file) {
    recognizeFace(req.file.path, (response) => {
      if (response.length) res.send(JSON.stringify({status:"SUCCESS",message:response}));
      else res.send(JSON.stringify({status:"FAIL",message:"No face detected!"}));
      fs.unlinkSync(req.file.path);
    });
  } else res.send(JSON.stringify({status:"FAIL",message:"No image sent!"}));
});

app.use(express.static(__dirname));

app.listen(port, localhost, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.listen(port, ip, () => {
  console.log(`Example app listening at http://${ip}:${port}`);
});

async function recognizeFace(
  imagePath: string,
  callback: (response: faceapi.FaceMatch[]) => void
) {
  let result: faceapi.FaceMatch[] = [];
  await faceNet.loadFromDisk("./face_modules/models");
  await faceLandmark68Net.loadFromDisk("./face_modules/models");
  await faceRecognitionNet.loadFromDisk("./face_modules/models");

  // faceRecognition and output to image
  const img = await canvas.loadImage(imagePath);

  const results = await faceapi
    .detectAllFaces(img, faceOption)
    .withFaceLandmarks()
    .withFaceDescriptors();
  if (results) {
    results.map((res) => {
      result.push(faceMatcher.findBestMatch(res.descriptor));
    });
  } else console.log("No face detected!");
  callback(result);
}
