import fs from "fs";

console.log("Start");

fs.readFile("data.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log(data);
});

console.log("End");
