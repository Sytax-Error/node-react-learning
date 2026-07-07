console.log("start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Inside promise");
});

process.nextTick(() => {
  console.log("Inside next tick");
});

console.log("end");
