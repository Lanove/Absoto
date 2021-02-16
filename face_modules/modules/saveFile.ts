import * as fs from "fs";
import * as path from "path";

const baseDir = path.resolve(__dirname, '../../');
export function saveFile(fileName: string, buf: Buffer) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }
  fs.writeFileSync(path.resolve(baseDir, fileName), buf);
}

export function readFile(fileName: string) {
  return fs.readFileSync(path.resolve(baseDir, fileName));
}

export function readMultipleFiles(filename : string,onFileContent : string,onError : string){
    console.log(filename,onFileContent,onError);
}

// function readFiles(dirName : string, onFileContent : (filename: string, content: Buffer) => void, onError : (err: NodeJS.ErrnoException | null) => void) {
//   const dirname = path.resolve(baseDir, dirName);
//     fs.readdir(dirname, function (err, filenames) {
//     if (err) {
//       onError(err);
//       return;
//     }
//     filenames.forEach(function (filename) {
//       fs.readFile(path.resolve(dirname, filename), function (err, content) {
//         if (err) {
//           onError(err);
//           return;
//         }
//         onFileContent(filename, content);
//       });
//     });
//   });
// }
