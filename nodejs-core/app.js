console.log("Start");

setTimeout(() => {
  console.log("Inside Timer");
}, 0);

const startTime = Date.now();

while (Date.now() - startTime < 3000) {
  console.log("Blocking loop");
}

console.log("Blocking finish");

console.log("End");
