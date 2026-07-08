import path from "path";
import fs from "fs";

// const relativePath = path.join("files", "notes.txt"); // Creates OS-safe paths

// const data = fs.readFileSync(relativePath, "utf-8");

// const absolutePath = path.resolve("files", "notes.txt");

// const fileName = path.basename(relativePath);

// const folderPath = path.dirname(relativePath);

// const fileExtenstion = path.extname(relativePath);

// const parsPath = path.parse(relativePath); // All path detail in one object

// console.log("File Path: ", relativePath);
// console.log("File Name: ", fileName);
// console.log("Folder Path: ", folderPath);
// console.log("File extenstion: ", fileExtenstion);
// console.log(parsPath);

import { fileURLToPath } from "url";

const currentFileUrl = import.meta.url; //gives the current file URL.
const _filename = fileURLToPath(import.meta.url); // converts file URL into normal file path.
const _dirname = path.dirname(_filename); // gets folder path from file path.

const filePath = path.join(_dirname, "files", "notes.txt");
const fileData = fs.readFileSync(filePath, "utf-8");
// console.log("file name:", _filename);
// console.log("directory name: ", _dirname);
console.log("File data: ", fileData);
