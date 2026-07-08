// console.log("Node version: ", process.version);
// console.log("Platform: ", process.platform);
// console.log("Process Id: ", process.pid);
// console.log("Current working directory: ", process.cwd()); // where command was executed from

// console.log("Node env: ", process.env.NODE_ENV);

// console.log("HOME: ", process.env.HOME);

// console.log(process.argv);

// const name = process.argv[2];
// const role = process.argv[3];

// console.log("Name: ", name);
// console.log("Role: ", role);

// Tells how many seconds the current Node.js process has been running.

// console.log("process start");

// setTimeout(() => {
//   console.log("Uptime: ", process.uptime(), "seconds");
// }, 3000);

// Check memory usage of the current Node.js process.

// const memoryUsage = process.memoryUsage();

// console.log("RSS: ", Math.round(memoryUsage.rss / 1024 / 1024), "MB");
// console.log(
//   "HEAP Total: ",
//   Math.round(memoryUsage.heapTotal / 1024 / 1024),
//   "MB",
// );
// console.log(
//   "HEAP Used: ",
//   Math.round(memoryUsage.heapUsed / 1024 / 1024),
//   "MB",
// );

// Used to stop the current Node.js process.

console.log("Befor exit");

process.exit(0);

console.log("After exit");
