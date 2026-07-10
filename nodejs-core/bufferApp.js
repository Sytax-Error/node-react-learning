// const buffer = Buffer.from("Hello");

// console.log(buffer.toString());
// // 1 character usually = 1 byte
// console.log("Buffer length: ", buffer.length); // output: 5 Buffer length means how many bytes are stored.

//************* creates a Buffer with fixed size memory **************

// const buffer = Buffer.alloc(10); // creates an empty Buffer with 10 bytes.

// console.log(buffer);
// console.log("buffer length: ", buffer.length);

//************* Write data into Buffer **************
// const buffer = Buffer.alloc(10);

// buffer.write("hello");

// console.log(buffer);

// console.log("buffer string: ", buffer.toString());

// console.log("Clean string: ", buffer.toString("utf-8", 0, 5)); // Convert only bytes from index 0 to index 5

// console.log("Buffer length: ", buffer.length);

// const buffer = Buffer.from([72, 101, 108, 108, 111]); // H e l l o So Node converts those byte values into text.

// console.log(buffer);
// console.log(buffer.toString());

// ************************************************** Buffer with file reading **************************************************

// import fs from "fs";

// const data = fs.readFileSync("./files/notes.txt");
// console.log("data:", data); // Without "utf-8", Node reads the file as raw binary data. So Node returns: Buffer
// console.log("String: ", data.toString()); // converts that Buffer into readable text.

// ************************************************** Write Buffer data into a file **************************************************

import fs from "fs";

const buffer = Buffer.from("This file created using buffer data");

fs.writeFileSync("./files/buffer-output.txt", buffer);

console.log("File creatd successfully");

const data = fs.readFileSync("./files/buffer-output.txt");

console.log("Buffer data: ", data);
console.log("String data: ", data.toString());
