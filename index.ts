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

const bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({dest:'uploads/'});

const networkInterfaces = os.networkInterfaces(),
  express = require("express"),
  app = express(),
  // app2 = express(),
  ip = networkInterfaces["Wi-Fi"][1]["address"].toString(),
  localhost = "localhost",
  port = 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/apiTest",upload.single("imageFile"),(req,res) =>{
  res.set('Connection','keep-alive');
  console.log(req.headers);
  console.log(req.file);
  if(req.file){

  }else
  res.send("ERROR : No image sent");
});

app.use(express.static(__dirname));

app.listen(port, localhost, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.listen(port, ip, () => {
  console.log(
    `Example app listening at http://${ip}:${port}`
  );
});