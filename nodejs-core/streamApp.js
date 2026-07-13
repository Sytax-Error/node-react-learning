import fs from "fs";

// const data = "This is node js stream practic \n";
// for (let i = 0; i < 1000000; i++) {
//   fs.appendFileSync("./files/large-file.txt", data);
// }
// console.log("Large file created successfully");

// const data = fs.readFileSync("./files/large-file.txt", "utf-8");

// console.log(data);

// ***************************** Read file using Stream *****************************

// const readStream = fs.createReadStream("./files/large-file.txt", "utf-8");

// readStream.on("data", (chunk) => {
//   console.log("New chunk received:");
//   console.log("chunk size: ", chunk.length); // By default, file read stream usually reads chunks around: 64 KB = 65536 bytes
// });

// readStream.on("end", () => {
//   console.log("File reading completed");
// });

// ***************************** Control chunk size *****************************

// const readStream = fs.createReadStream("./files/large-file.txt", {
//   encoding: "utf-8",
//   hightWaterMark: 1024,
// });

// readStream.on("data", (chunk) => {
//   console.log("New chunk recived");
//   console.log("chunk size:", chunk.length);
// });

// readStream.on("end", () => {
//   console.log("File reading compeleted");
// });

// ***************************** Write file using Stream *****************************

// const writeStream = fs.createWriteStream("./files/large-file.txt", {
//   encoding: "utf-8",
//   highWaterMark: 1024,
// });

// writeStream.write("This is the first line using create stream\n");
// writeStream.write("This is the second line using create stream\n");
// writeStream.write("This is the thired line using create stream\n");

// writeStream.end();

// writeStream.on("finish", () => {
//   console.log("File writing completed");
// });

// ***************************** Copy file using Stream *****************************

// const readStream = fs.createReadStream("./files/large-file.txt", "utf-8");
// const writeStream = fs.createWriteStream("./files/copy-large-file.txt");

// readStream.on("data", (chunk) => {
//   writeStream.write(chunk);
// });

// readStream.on("end", () => {
//   writeStream.end();
//   console.log("File copied successfully");
// });

// ***************************** Copy file using pipe() *****************************

// const readStream = fs.createReadStream("./files/large-file.txt", "utf-8");
// const writeStream = fs.createWriteStream("./files/copy-file.txt");

// readStream.pipe(writeStream);

// //  Handle stream errors
// readStream.on("error", (error) => {
//   console.log("Read stream error: ", error.message);
// });

// writeStream.on("error", (error) => {
//   console.log("Write stream error: ", error.message);
// });

// writeStream.on("finish", () => {
//   console.log("File copied successfully");
// });

// ***************************** Copy image using stream *****************************

const readStream = fs.createReadStream("./files/login.png");
const writeStream = fs.createWriteStream("./files/copy-login.png");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Image copyed successfully");
});

readStream.on("error", (error) => {
  console.log("Read stream error: ", error.message);
});

writeStream.on("error", (error) => {
  console.log("Write stream error: ", error.message);
});
