// import fs from "fs";
// ********************************* Synchronous file reading *********************************

// const data = fs.readFileSync("data.txt", "utf-8");
// console.log("data: ", data);

// fs.writeFileSync(  // Create new file with content
//   "./files/output.text",
//   "This file is created using node js fs module",
// );

// fs.appendFileSync( // Edit the existing file content
//   "./files/output.txt",
//   "\n This line is append using node js fs module.",
// );

// const files = fs.readdirSync("./files"); // Reads the contents of a folder.

// const fileExists = fs.existsSync("./files/output1.txt"); // Check file exist or not

// ******************** Create new Folder ********************
// if (!fs.existsSync("./new-folder")) {
//   fs.mkdirSync("./new-floder"); // Create new folder
//   console.log("Folder created successfully");
// } else {
//   console.log("Folder already exists");
// }

// ******************* Delete a File *************************
// if (fs.existsSync("./files/output.txt")) {
//   fs.unlinkSync("./files/output.txt");
//   console.log("File deleted successfully");
// } else {
//   console.log("file does not exist");
// }

// ********************************* Asynchronous file reading *********************************

//  ############ Read File ############

// console.log("Start");
// fs.readFile("./files/notes.txt", "utf-8", (error, data) => {
//   if (error) {
//     console.log("Error: ", error.message);
//   }
//   console.log("File data: ", data);
// });
// console.log("End");

//  ############ Write File ############

// fs.writeFile("./files/notes.txt", "This Second line", (error) => {
//   if (error) {
//     console.log("Error: ", error.message);
//     return;
//   }
//   console.log("File written successfully");
// });

//  ############ Append File ############

// fs.appendFile(
//   "./files/async-output.txt",
//   "\n This is the appended line 1111",
//   (error) => {
//     if (error) {
//       console.log("Error: ", error.message);
//     }
//     console.log("File line append successfully");
//   },
// );

// ********************************* Promise-based fs API *********************************

import fs from "fs/promises";

//  ############ Read File ############

// const readFile = async () => {
//   try {
//     const data = await fs.readFile("./files/notes.txt", "utf-8");
//     console.log("Data: ", data);
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };
// readFile();

//  ############ Write File ############

// const writeFile = async () => {
//   try {
//     console.log("Start");

//     await fs.writeFile(
//       "./files/promise-output.txt",
//       "This file is created using poromises based fs api.",
//     );

//     console.log("File written successfully");

//     console.log("End");
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };
// writeFile();

//  ############ Append File ############

// const appendFile = async () => {
//   try {
//     await fs.appendFile(
//       "./files/promise-output.txt",
//       "\nThis line append using promise fs api",
//     );
//     console.log("File append successfully");
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };
// appendFile();

//  ############ Read Folder ############

// const readFolder = async () => {
//   try {
//     const files = await fs.readdir("./files");
//     console.log("Files: ", files);
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };
// readFolder();

//  ############ Check file exists ############

// const fileExists = async () => {
//   try {
//     await fs.access("./files/notes.txt");

//     console.log("File Exists");
//   } catch (error) {
//     console.log("Error: ", error.message);
//   }
// };
// fileExists();

//  ############ Delete file ############

const deleteFile = async () => {
  try {
    await fs.unlink("./files/promise-output.txt");

    console.log("File deleted successfully");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

deleteFile();
