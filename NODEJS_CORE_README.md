# Day 1: What is Node.js Runtime?

## Objective

The objective of Day 1 is to understand what Node.js is and how it allows JavaScript to run outside the browser.

---

## What is Node.js?

Node.js is a JavaScript runtime.

A runtime is an environment where code can run.

Normally, JavaScript runs inside browsers like:

```txt
Chrome
Firefox
Edge
Safari
```

Node.js allows JavaScript to run outside the browser.

Example:

```bash
node app.js
```

Simple definition:

```txt
Node.js allows JavaScript to run on a computer or server without using a browser.
```

---

## Browser JavaScript vs Node.js

JavaScript can run in two different environments:

```txt
Browser
Node.js
```

### Browser JavaScript

Browser JavaScript is mainly used for frontend work.

It can work with:

```txt
HTML
CSS
DOM
Events
Forms
Buttons
Local storage
```

Example:

```js
document.querySelector("h1");
```

This works in the browser because the browser provides the `document` object.

---

### Node.js JavaScript

Node.js is mainly used for backend/server-side work.

It can work with:

```txt
Files
Servers
APIs
Databases
Operating system
Network requests
Background tasks
```

Example:

```js
console.log(process.version);
```

This works in Node.js because Node.js provides the `process` object.

---

## First Node.js Program

Created file:

```txt
nodejs-core/app.js
```

Code:

```js
console.log("Hello from Node.js");
```

Run command:

```bash
node app.js
```

Output:

```txt
Hello from Node.js
```

This proves that JavaScript can run outside the browser using Node.js.

---

## Browser API Test in Node.js

Code:

```js
console.log("Hello from Node.js");

console.log(document);
```

Run command:

```bash
node app.js
```

Output:

```txt
ReferenceError: document is not defined
```

Reason:

```txt
document belongs to the browser.
Node.js does not have DOM or document.
```

---

## Node.js API Test

Code:

```js
console.log("Hello from Node.js");

console.log("Current file path:", import.meta.url);

console.log("Node version:", process.version);

console.log("Platform:", process.platform);
```

Run command:

```bash
node app.js
```

Example output:

```txt
Hello from Node.js
Current file path: file:///.../nodejs-core/app.js
Node version: v22.22.0
Platform: linux
```

This proves that Node.js provides its own APIs like:

```txt
process
import.meta.url
```

---

## Important Parts Inside Node.js

Node.js is made of multiple important parts.

```txt
Node.js
├── V8 Engine
├── Node.js APIs
├── libuv
└── Event Loop
```

---

## V8 Engine

V8 is the JavaScript engine created by Google.

It is also used inside Google Chrome.

V8 converts JavaScript code into machine code so the computer can execute it.

Flow:

```txt
JavaScript code
↓
V8 Engine
↓
Machine code
↓
Computer executes the code
```

---

## Node.js APIs

Node.js provides backend APIs that are not available in the browser.

Examples:

```txt
fs       → file system
path     → file path handling
http     → create server
process  → current running process
events   → event handling
buffer   → binary data
stream   → handle data streams
```

These APIs help JavaScript perform backend tasks.

---

## libuv

libuv is a library used internally by Node.js.

It helps Node.js handle asynchronous operations.

Examples:

```txt
File reading
Timers
Network requests
Database operations
```

libuv helps Node.js perform non-blocking operations.

We will learn this in more detail later.

---

## Event Loop

The event loop helps Node.js handle asynchronous code.

It allows Node.js to continue running other code while waiting for async tasks to complete.

Example async tasks:

```txt
setTimeout
file reading
API request
database query
```

We will learn the event loop separately in detail.

---

## Simple Final Definition

```txt
Node.js is a JavaScript runtime built on the V8 engine.

It allows JavaScript to run outside the browser and provides backend APIs for building servers, working with files, connecting to databases, and handling asynchronous tasks.
```

---

## Key Learning

In Day 1, we learned:

```txt
Node.js is a JavaScript runtime
Node.js runs JavaScript outside the browser
Browser APIs like document are not available in Node.js
Node.js provides its own APIs like process
Node.js uses the V8 engine to execute JavaScript
Node.js uses libuv and event loop for async work
Node.js is mainly used for backend development
```

# Day 3: Synchronous vs Asynchronous Code

## Objective

The objective of Day 3 is to understand the difference between synchronous and asynchronous code in Node.js.

This is one of the most important concepts before learning the Node.js Event Loop.

---

## What is Synchronous Code?

Synchronous code runs line by line.

One line must finish before the next line starts.

Example:

```js
console.log("Start");

console.log("Middle");

console.log("End");
```

Output:

```txt
Start
Middle
End
```

Flow:

```txt
Start runs
↓
Middle runs
↓
End runs
```

This is called synchronous execution.

---

## Blocking Behavior in Synchronous Code

Synchronous code can block the next line.

Example:

```js
console.log("Start");

for (let i = 0; i < 5; i++) {
  console.log("Running loop:", i);
}

console.log("End");
```

Output:

```txt
Start
Running loop: 0
Running loop: 1
Running loop: 2
Running loop: 3
Running loop: 4
End
```

Here, `End` waits until the loop finishes.

This is called blocking behavior.

---

## What is Asynchronous Code?

Asynchronous code means a task can start, and JavaScript can continue running the next lines without waiting for that task to finish.

Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 2000);

console.log("End");
```

Output:

```txt
Start
End
Inside setTimeout
```

Flow:

```txt
Start prints
↓
setTimeout starts timer
↓
End prints
↓
After 2 seconds, callback runs
```

This is called asynchronous execution.

---

## Why End Prints Before setTimeout

`setTimeout` is asynchronous.

JavaScript does not wait for the timer to complete.

So this code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 2000);

console.log("End");
```

Prints:

```txt
Start
End
Inside setTimeout
```

This proves that asynchronous code does not block the next line.

---

## Zero Second Timer Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

console.log("End");
```

Output:

```txt
Start
End
Inside setTimeout
```

Even though the timer is `0`, the callback does not run immediately.

Reason:

```txt
setTimeout callback runs only after current synchronous code is completed.
```

So `0` milliseconds means:

```txt
Run after synchronous code is finished.
```

It does not mean:

```txt
Run immediately.
```

---

## Synchronous File Reading

Created file:

```txt
nodejs-core/data.txt
```

File content:

```txt
This is sample file content.
```

Code:

```js
import fs from "fs";

console.log("Start");

const data = fs.readFileSync("data.txt", "utf-8");

console.log(data);

console.log("End");
```

Output:

```txt
Start
This is sample file content.
End
```

---

## Why readFileSync Blocks

`fs.readFileSync()` is synchronous.

It blocks the next line until file reading is complete.

Flow:

```txt
Start prints
↓
File reading starts
↓
Node.js waits until file reading completes
↓
File content prints
↓
End prints
```

So this line:

```js
const data = fs.readFileSync("data.txt", "utf-8");
```

blocks the code execution until the file is fully read.

---

## Asynchronous File Reading

Code:

```js
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
```

Output:

```txt
Start
End
This is sample file content.
```

---

## Why readFile Does Not Block

`fs.readFile()` is asynchronous.

It starts file reading in the background and allows the next line to run.

Flow:

```txt
Start prints
↓
File reading starts in background
↓
End prints
↓
File reading completes
↓
Callback runs
↓
File content prints
```

So this line:

```js
fs.readFile("data.txt", "utf-8", callback);
```

does not block the next line.

---

## Synchronous vs Asynchronous File Reading

### Synchronous

```js
const data = fs.readFileSync("data.txt", "utf-8");
```

Behavior:

```txt
Waits for file reading to complete.
Blocks the next line.
```

Output:

```txt
Start
This is sample file content.
End
```

---

### Asynchronous

```js
fs.readFile("data.txt", "utf-8", callback);
```

Behavior:

```txt
Starts file reading.
Does not block the next line.
Runs callback later.
```

Output:

```txt
Start
End
This is sample file content.
```

---

## Simple Difference

```txt
Synchronous code
↓
Waits for current task to finish
Blocks next line

Asynchronous code
↓
Starts task
Does not wait
Runs result later using callback
```

---

## Why Node.js Uses Asynchronous Code

Node.js is mostly used for backend work.

Backend applications perform many time-taking operations like:

```txt
Reading files
Writing files
Calling APIs
Connecting to databases
Sending emails
Uploading files
Handling many users at the same time
```

If all these operations are synchronous, the server can become slow.

Asynchronous code helps Node.js continue handling other work while waiting for slow tasks to complete.

---

## Key Learning

In Day 3, we learned:

```txt
Synchronous code runs line by line
Synchronous code blocks the next line
Asynchronous code does not block the next line
setTimeout is asynchronous
setTimeout with 0 milliseconds still runs after synchronous code
fs.readFileSync is synchronous and blocking
fs.readFile is asynchronous and non-blocking
Node.js uses async code heavily for better performance
```

# Day 4: Call Stack, Callback Queue, and Microtask Queue

## Objective

The objective of Day 4 is to understand how JavaScript manages synchronous and asynchronous code internally.

This topic helps us understand the Node.js Event Loop more easily.

---

## What is Call Stack?

The call stack is the place where JavaScript keeps track of currently running code.

Simple meaning:

```txt
Call Stack
↓
Place where JavaScript executes functions
```

JavaScript runs synchronous code using the call stack.

---

## Basic Call Stack Example

Code:

```js
function first() {
  console.log("First function");
}

function second() {
  console.log("Second function");
}

console.log("Start");

first();

second();

console.log("End");
```

Output:

```txt
Start
First function
Second function
End
```

Flow:

```txt
console.log("Start") runs
↓
first() enters call stack
↓
first() finishes and leaves call stack
↓
second() enters call stack
↓
second() finishes and leaves call stack
↓
console.log("End") runs
```

---

## Function Inside Function

Code:

```js
function third() {
  console.log("Third function");
}

function second() {
  console.log("Second function start");

  third();

  console.log("Second function end");
}

function first() {
  console.log("First function start");

  second();

  console.log("First function end");
}

console.log("Program start");

first();

console.log("Program end");
```

Output:

```txt
Program start
First function start
Second function start
Third function
Second function end
First function end
Program end
```

---

## Call Stack Order

Call stack follows this rule:

```txt
Last In, First Out
```

Short form:

```txt
LIFO
```

Meaning:

```txt
The last function that enters the stack finishes first.
```

In this example:

```txt
first()
↓
second()
↓
third()
```

`third()` entered last, so it finishes first.

Visual:

```txt
Call Stack

| third  |  ← finishes first
| second |
| first  |
```

Flow:

```txt
1. first() enters stack
2. second() enters stack
3. third() enters stack
4. third() finishes and leaves
5. second() finishes and leaves
6. first() finishes and leaves
```

---

## Call Stack with Error

Code:

```js
function third() {
  throw new Error("Something went wrong in third function");
}

function second() {
  third();
}

function first() {
  second();
}

first();
```

Output:

```txt
Error: Something went wrong in third function
    at third
    at second
    at first
```

This is called a stack trace.

It tells us the function call path:

```txt
first() called second()
second() called third()
third() threw the error
```

Stack trace helps us debug where an error came from.

---

## What is Callback Queue?

Callback Queue is where some asynchronous callbacks wait before going back to the call stack.

Example asynchronous API:

```txt
setTimeout
```

---

## Callback Queue Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

console.log("End");
```

Output:

```txt
Start
End
Inside setTimeout
```

---

## Why setTimeout Runs Later

`setTimeout` callback does not directly run in the call stack.

Flow:

```txt
console.log("Start") runs
↓
setTimeout callback goes to timer system
↓
console.log("End") runs
↓
Call stack becomes empty
↓
setTimeout callback moves to callback queue
↓
Event loop sends callback to call stack
↓
Inside setTimeout prints
```

So even with `0` milliseconds, `setTimeout` runs after synchronous code.

---

## What is Microtask Queue?

Microtask Queue is another queue used by JavaScript.

It is used by:

```txt
Promise.then()
async/await continuation
queueMicrotask()
```

Important rule:

```txt
Microtask Queue has higher priority than Callback Queue.
```

That means Promise callbacks run before `setTimeout` callbacks.

---

## Microtask Queue Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Inside Promise");
});

console.log("End");
```

Output:

```txt
Start
End
Inside Promise
Inside setTimeout
```

---

## Why Promise Runs Before setTimeout

Flow:

```txt
Start prints
↓
setTimeout callback waits in Callback Queue
↓
Promise callback waits in Microtask Queue
↓
End prints
↓
Call stack becomes empty
↓
Microtask Queue runs first
↓
Callback Queue runs after that
```

So this is the priority:

```txt
Call Stack
↓
Microtask Queue
↓
Callback Queue
```

---

## process.nextTick in Node.js

Node.js has one special queue:

```txt
process.nextTick Queue
```

This queue has higher priority than Promise microtasks.

---

## process.nextTick Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Inside Promise");
});

process.nextTick(() => {
  console.log("Inside process.nextTick");
});

console.log("End");
```

Output:

```txt
Start
End
Inside process.nextTick
Inside Promise
Inside setTimeout
```

---

## Node.js Priority Order

In Node.js, execution priority is:

```txt
1. Synchronous code
2. process.nextTick queue
3. Promise microtask queue
4. Timer / Callback queue
```

Simple flow:

```txt
Call Stack
↓
process.nextTick Queue
↓
Promise Microtask Queue
↓
Callback Queue / Timer Queue
```

---

## Final Execution Rule

Remember this rule:

```txt
Synchronous code always runs first.

After synchronous code finishes, Node.js checks process.nextTick queue.

Then Node.js checks Promise microtask queue.

Then Node.js runs timer/callback queue tasks like setTimeout.
```

---

## Complete Priority Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Inside Promise");
});

process.nextTick(() => {
  console.log("Inside process.nextTick");
});

console.log("End");
```

Output:

```txt
Start
End
Inside process.nextTick
Inside Promise
Inside setTimeout
```

---

## Key Learning

In Day 4, we learned:

```txt
Call stack runs synchronous code
Call stack follows LIFO rule
Stack trace shows function call path during errors
setTimeout callback waits in callback queue
Promise.then callback waits in microtask queue
Microtask queue has higher priority than callback queue
process.nextTick has higher priority than Promise in Node.js
Synchronous code always runs first
Node.js execution order is sync code, nextTick, Promise, then timer callbacks
```
# Day 5: Event Loop

## Objective

The objective of Day 5 is to understand what the Event Loop is and how Node.js handles asynchronous code.

The Event Loop is one of the most important concepts in Node.js.

---

## What is Event Loop?

The Event Loop is the mechanism that allows Node.js to handle asynchronous code.

Simple meaning:

```txt
Event Loop checks whether the call stack is empty.

If the call stack is empty, it moves waiting callbacks from queues to the call stack.
```

---

## Why Event Loop is Needed

Node.js uses a single main thread to execute JavaScript code.

If Node.js waited for every slow task to finish, the server would become blocked.

Slow tasks can be:

```txt
File reading
Database query
API call
Timer
Network request
```

The Event Loop helps Node.js continue running other code while async tasks are waiting in the background.

---

## Basic Event Loop Flow

```txt
Synchronous code runs first
↓
Call stack becomes empty
↓
Event Loop checks queues
↓
process.nextTick callbacks run
↓
Promise microtasks run
↓
Timer callbacks run
```

---

## Event Loop Priority Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

process.nextTick(() => {
  console.log("Next tick callback");
});

console.log("End");
```

Output:

```txt
Start
End
Next tick callback
Promise callback
Timer callback
```

---

## Execution Order

In Node.js, the execution order is:

```txt
1. Synchronous code
2. process.nextTick queue
3. Promise microtask queue
4. Timer callback queue
```

This is why the output is:

```txt
Start
End
Next tick callback
Promise callback
Timer callback
```

---

## Event Loop with Asynchronous File Reading

Code:

```js
import fs from "fs";

console.log("Program start");

fs.readFile("data.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("File content:", data);
});

console.log("Program end");
```

Output:

```txt
Program start
Program end
File content: This is sample file content.
```

---

## Why Program End Prints First

`fs.readFile()` is asynchronous.

Node.js starts file reading in the background and continues executing the next line.

Flow:

```txt
Program start prints
↓
File reading starts in background
↓
Program end prints
↓
File reading completes
↓
Callback waits in queue
↓
Event Loop sends callback to call stack
↓
File content prints
```

---

## Event Loop Responsibility

The Event Loop has one main responsibility:

```txt
Check whether the call stack is empty.

If it is empty, move ready callbacks from queues to the call stack.
```

Simple structure:

```txt
Call Stack
↓
Runs current JavaScript code

Queues
↓
Store callbacks waiting to run

Event Loop
↓
Moves callbacks from queues to call stack when stack is empty
```

---

## Multiple Async Tasks Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer 1");
}, 0);

setTimeout(() => {
  console.log("Timer 2");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

Promise.resolve().then(() => {
  console.log("Promise 2");
});

console.log("End");
```

Output:

```txt
Start
End
Promise 1
Promise 2
Timer 1
Timer 2
```

Reason:

```txt
Synchronous code runs first
Promise callbacks run next
Timer callbacks run after Promise callbacks
```

---

## Event Loop and Blocking Code

Even if async callbacks are ready, they cannot run until synchronous code finishes.

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer callback");
}, 0);

for (let i = 0; i < 5; i++) {
  console.log("Blocking loop:", i);
}

console.log("End");
```

Output:

```txt
Start
Blocking loop: 0
Blocking loop: 1
Blocking loop: 2
Blocking loop: 3
Blocking loop: 4
End
Timer callback
```

---

## Why Timer Callback Runs Last

The `for` loop is synchronous.

So the timer callback waits until:

```txt
Loop finishes
↓
End prints
↓
Call stack becomes empty
↓
Event Loop sends timer callback to call stack
```

Important rule:

```txt
Event Loop can run callbacks only when the call stack is empty.
```

---

## Heavy Blocking Code Example

Code:

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer callback");
}, 0);

const startTime = Date.now();

while (Date.now() - startTime < 3000) {
  // blocking for 3 seconds
}

console.log("Blocking finished");

console.log("End");
```

Output:

```txt
Start
Blocking finished
End
Timer callback
```

---

## Why setTimeout 0 Still Waits

Even though the timer is `0`, it still waits for the blocking `while` loop to finish.

Reason:

```txt
Async callback cannot interrupt running synchronous code.
```

The callback can run only when the call stack becomes empty.

---

## Simple Event Loop Rule

```txt
Synchronous code always runs first.

Async callbacks wait in queues.

Event Loop moves callbacks to call stack only when the call stack is empty.
```

---

## Final Event Loop Flow

```txt
JavaScript synchronous code
↓
Call Stack
↓
Call Stack becomes empty
↓
Event Loop checks queues
↓
process.nextTick Queue
↓
Promise Microtask Queue
↓
Timer / Callback Queue
↓
Callback runs in Call Stack
```

---

## Key Learning

In Day 5, we learned:

```txt
Event Loop handles asynchronous callbacks
Synchronous code always runs first
Event Loop checks queues after call stack becomes empty
process.nextTick runs before Promise
Promise callbacks run before timer callbacks
setTimeout callback waits in timer queue
fs.readFile callback runs later after async file reading
Blocking synchronous code delays async callbacks
Async callbacks cannot interrupt running synchronous code
Event Loop allows Node.js to handle non-blocking operations
```
# Day 6: Node.js Modules

## Objective

The objective of Day 6 is to understand how modules work in Node.js.

Modules help us split code into separate files and reuse code across the project.

---

## What is a Module?

A module is a separate JavaScript file.

Instead of writing all code in one file, we can divide code into multiple files.

Example:

```txt
nodejs-core/
├── app.js
├── math.js
└── message.js
```

Each file can act as a module.

---

## Why Modules are Needed

Modules help keep code:

```txt
Clean
Reusable
Organized
Easy to maintain
Easy to test
```

Without modules, one file can become very large and difficult to manage.

Bad structure:

```txt
app.js
↓
all functions
all logic
all variables
all code
```

Better structure:

```txt
app.js
↓
main file that uses other modules

math.js
↓
math-related functions

message.js
↓
message-related functions
```

---

## Module Systems in Node.js

Node.js mainly supports two module systems:

```txt
CommonJS
ES Modules
```

---

## ES Modules

ES Modules use:

```txt
import
export
```

Example:

```js
import fs from "fs";

export const add = () => {};
```

Our current Express backend project uses ES Modules.

That is why we write:

```js
import express from "express";
```

---

## CommonJS

CommonJS uses:

```txt
require
module.exports
```

Example:

```js
const fs = require("fs");

module.exports = {};
```

CommonJS is the older Node.js module system.

---

## Named Export

Created file:

```txt
nodejs-core/math.js
```

Code:

```js
export const add = (a, b) => {
  return a + b;
};
```

This is called a named export because the function is exported with a name:

```txt
add
```

---

## Importing Named Export

Code in:

```txt
nodejs-core/app.js
```

```js
import { add } from "./math.js";

const result = add(10, 20);

console.log("Result:", result);
```

Run command:

```bash
node app.js
```

Output:

```txt
Result: 30
```

---

## Multiple Named Exports

Updated:

```txt
nodejs-core/math.js
```

```js
export const add = (a, b) => {
  return a + b;
};

export const subtract = (a, b) => {
  return a - b;
};
```

Updated:

```txt
nodejs-core/app.js
```

```js
import { add, subtract } from "./math.js";

console.log("Add:", add(10, 20));

console.log("Subtract:", subtract(30, 10));
```

Output:

```txt
Add: 30
Subtract: 20
```

---

## Named Export Rule

Named exports must be imported using curly braces.

Example:

```js
import { add, subtract } from "./math.js";
```

Important:

```txt
Named export
↓
Import with same exported name
↓
Use curly braces
```

---

## Import Alias

Named imports can be renamed using `as`.

Example:

```js
import { add as sum, subtract } from "./math.js";

console.log("Sum:", sum(10, 20));

console.log("Subtract:", subtract(30, 10));
```

Output:

```txt
Sum: 30
Subtract: 20
```

Meaning:

```txt
add is exported from math.js
sum is the local name inside app.js
```

---

## Default Export

Created file:

```txt
nodejs-core/message.js
```

Code:

```js
const getMessage = () => {
  return "Hello from default export";
};

export default getMessage;
```

This is called a default export.

A file can have one default export.

---

## Importing Default Export

Code:

```js
import getMessage from "./message.js";

console.log(getMessage());
```

Output:

```txt
Hello from default export
```

---

## Default Export Rule

Default export is imported without curly braces.

Example:

```js
import getMessage from "./message.js";
```

Important:

```txt
Default export
↓
Import without curly braces
```

---

## Default Export Can Be Renamed

With default export, the import name can be different.

Example:

```js
import myMessage from "./message.js";

console.log(myMessage());
```

Output:

```txt
Hello from default export
```

This works because `message.js` has one default export.

So Node.js knows what to import.

---

## Named Export vs Default Export

### Named Export

Export:

```js
export const add = (a, b) => {
  return a + b;
};
```

Import:

```js
import { add } from "./math.js";
```

Rules:

```txt
Uses curly braces
Import name should match exported name
Multiple named exports are allowed
```

---

### Default Export

Export:

```js
export default getMessage;
```

Import:

```js
import myMessage from "./message.js";
```

Rules:

```txt
Does not use curly braces
Import name can be different
Only one default export is allowed per file
```

---

## Using Named and Default Export Together

Code in:

```txt
nodejs-core/app.js
```

```js
import myMessage from "./message.js";
import { add, subtract } from "./math.js";

console.log(myMessage());

console.log("Add:", add(10, 20));

console.log("Subtract:", subtract(30, 10));
```

Output:

```txt
Hello from default export
Add: 30
Subtract: 20
```

---

## CommonJS Module System

CommonJS is the older Node.js module system.

It uses:

```txt
require
module.exports
```

Because our project uses ES Modules, we used `.cjs` files for CommonJS practice.

---

## CommonJS Export

Created file:

```txt
nodejs-core/commonMath.cjs
```

Code:

```js
const multiply = (a, b) => {
  return a * b;
};

module.exports = {
  multiply,
};
```

---

## CommonJS Import

Created file:

```txt
nodejs-core/commonApp.cjs
```

Code:

```js
const { multiply } = require("./commonMath.cjs");

console.log("Multiply:", multiply(10, 5));
```

Run command:

```bash
node commonApp.cjs
```

Output:

```txt
Multiply: 50
```

---

## ES Modules vs CommonJS

```txt
ES Modules
↓
import / export

CommonJS
↓
require / module.exports
```

---

## ES Modules Example

Export:

```js
export const add = (a, b) => {
  return a + b;
};
```

Import:

```js
import { add } from "./math.js";
```

---

## CommonJS Example

Export:

```js
module.exports = {
  multiply,
};
```

Import:

```js
const { multiply } = require("./commonMath.cjs");
```

---

## Why Local Imports Need .js Extension

In ES Modules, local file imports should include the file extension.

Correct:

```js
import { add } from "./math.js";
```

Wrong:

```js
import { add } from "./math";
```

In our Express project, this is why we write:

```js
import { env } from "./config/env.js";
```

If `.js` is missing, Node.js can throw:

```txt
ERR_MODULE_NOT_FOUND
```

---

## Key Learning

In Day 6, we learned:

```txt
A module is a separate JavaScript file
Modules help keep code clean and reusable
Node.js supports CommonJS and ES Modules
ES Modules use import and export
CommonJS uses require and module.exports
Named exports use curly braces
Default exports do not use curly braces
Default exports can be imported with any name
Named exports can be renamed using as
Local ES Module imports need .js extension
Our Express backend project uses ES Modules
```
# Day 7: File System Module

## Objective

The objective of Day 7 is to understand the Node.js `fs` module.

The `fs` module allows Node.js to work with files and folders.

---

## What is fs Module?

`fs` means File System.

It is a built-in Node.js module used to work with files and folders.

Using `fs`, we can:

```txt
Read files
Write files
Append data to files
Delete files
Create folders
Read folder contents
Check if file exists
```

In browser JavaScript, we cannot directly access system files like this.

Node.js can access files because it runs on a computer or server.

---

## Practice Folder Structure

Created folder and file:

```txt
nodejs-core/
├── app.js
├── files/
│   └── notes.txt
```

Content inside `notes.txt`:

```txt
This is my first fs module note.
```

---

## Read File Synchronously

Code:

```js
import fs from "fs";

const data = fs.readFileSync("./files/notes.txt", "utf-8");

console.log(data);
```

Output:

```txt
This is my first fs module note.
```

---

## What is readFileSync?

`fs.readFileSync()` reads a file synchronously.

Meaning:

```txt
Node.js waits until file reading is complete.
Then the next line runs.
```

So this method is blocking.

---

## Understanding utf-8

Code:

```js
const data = fs.readFileSync("./files/notes.txt", "utf-8");
```

`utf-8` tells Node.js to read the file as normal text.

Without `utf-8`, Node.js returns Buffer data.

Example without `utf-8`:

```js
import fs from "fs";

const data = fs.readFileSync("./files/notes.txt");

console.log(data);
```

Output:

```txt
<Buffer 54 68 69 73 20 69 73 ...>
```

---

## Buffer to String

If file is read without `utf-8`, we can convert Buffer to string.

Code:

```js
import fs from "fs";

const data = fs.readFileSync("./files/notes.txt");

console.log("Buffer data:", data);

console.log("Text data:", data.toString());
```

Output:

```txt
Buffer data: <Buffer ...>
Text data: This is my first fs module note.
```

---

## Write File Synchronously

Code:

```js
import fs from "fs";

fs.writeFileSync(
  "./files/output.txt",
  "This file is created using Node.js fs module."
);

console.log("File written successfully");
```

Output:

```txt
File written successfully
```

Created file:

```txt
nodejs-core/files/output.txt
```

File content:

```txt
This file is created using Node.js fs module.
```

---

## What is writeFileSync?

`fs.writeFileSync()` writes data to a file synchronously.

Important behavior:

```txt
Creates a new file if it does not exist.
Overwrites old content if the file already exists.
```

---

## Append Data Synchronously

Code:

```js
import fs from "fs";

fs.appendFileSync(
  "./files/output.txt",
  "\nThis line is appended using appendFileSync."
);

console.log("Data appended successfully");
```

Output:

```txt
Data appended successfully
```

Final file content:

```txt
This file is created using Node.js fs module.
This line is appended using appendFileSync.
```

---

## writeFileSync vs appendFileSync

```txt
writeFileSync
↓
Creates or overwrites file content

appendFileSync
↓
Adds new content at the end of file
```

---

## Read Folder Files Synchronously

Code:

```js
import fs from "fs";

const files = fs.readdirSync("./files");

console.log(files);
```

Example output:

```txt
[ 'notes.txt', 'output.txt' ]
```

---

## What is readdirSync?

`fs.readdirSync()` reads the contents of a folder synchronously.

It returns an array of file and folder names.

---

## Check File Exists

Code:

```js
import fs from "fs";

const fileExists = fs.existsSync("./files/output.txt");

console.log("File exists:", fileExists);
```

Output:

```txt
File exists: true
```

Test with wrong file:

```js
import fs from "fs";

const fileExists = fs.existsSync("./files/random.txt");

console.log("File exists:", fileExists);
```

Output:

```txt
File exists: false
```

---

## What is existsSync?

`fs.existsSync()` checks whether a file or folder exists.

It returns:

```txt
true  → file or folder exists
false → file or folder does not exist
```

---

## Create Folder Synchronously

Code:

```js
import fs from "fs";

if (!fs.existsSync("./new-folder")) {
  fs.mkdirSync("./new-folder");
  console.log("Folder created successfully");
} else {
  console.log("Folder already exists");
}
```

First run output:

```txt
Folder created successfully
```

Second run output:

```txt
Folder already exists
```

---

## What is mkdirSync?

`fs.mkdirSync()` creates a new folder synchronously.

We used `fs.existsSync()` before creating the folder to avoid an error if the folder already exists.

---

## Delete File Synchronously

Code:

```js
import fs from "fs";

if (fs.existsSync("./files/output.txt")) {
  fs.unlinkSync("./files/output.txt");
  console.log("File deleted successfully");
} else {
  console.log("File does not exist");
}
```

First run output:

```txt
File deleted successfully
```

Second run output:

```txt
File does not exist
```

---

## What is unlinkSync?

`fs.unlinkSync()` deletes a file synchronously.

We used `existsSync()` first to avoid an error if the file does not exist.

---

## Asynchronous File Read with Callback

Code:

```js
import fs from "fs";

console.log("Start");

fs.readFile("./files/notes.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("Error:", error.message);
    return;
  }

  console.log("File content:", data);
});

console.log("End");
```

Output:

```txt
Start
End
File content: This is my first fs module note.
```

---

## Why End Prints First?

`fs.readFile()` is asynchronous.

Node.js starts reading the file and continues to the next line.

That is why `End` prints before the file content.

---

## Asynchronous File Write with Callback

Code:

```js
import fs from "fs";

console.log("Start");

fs.writeFile(
  "./files/async-output.txt",
  "This file is created asynchronously.",
  (error) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    console.log("File written successfully");
  }
);

console.log("End");
```

Output:

```txt
Start
End
File written successfully
```

Created file:

```txt
nodejs-core/files/async-output.txt
```

---

## Asynchronous File Append with Callback

Code:

```js
import fs from "fs";

console.log("Start");

fs.appendFile(
  "./files/async-output.txt",
  "\nThis line is appended asynchronously.",
  (error) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    console.log("Data appended successfully");
  }
);

console.log("End");
```

Output:

```txt
Start
End
Data appended successfully
```

---

## Callback API vs Promise API

Node.js provides different ways to use the `fs` module.

### Callback Style

```js
fs.readFile("./files/notes.txt", "utf-8", (error, data) => {
  console.log(data);
});
```

### Promise Style

```js
import fs from "fs/promises";

const data = await fs.readFile("./files/notes.txt", "utf-8");
```

Modern Node.js projects commonly use the Promise API with `async/await`.

---

## Why fs/promises is Cleaner

`fs/promises` is cleaner because:

```txt
No callback nesting
Works with async/await
Cleaner error handling with try/catch
Easier to read
Common in modern Node.js projects
```

---

## Read File Using fs/promises

Code:

```js
import fs from "fs/promises";

const readNoteFile = async () => {
  try {
    console.log("Start");

    const data = await fs.readFile("./files/notes.txt", "utf-8");

    console.log("File content:", data);

    console.log("End");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

readNoteFile();
```

Output:

```txt
Start
File content: This is my first fs module note.
End
```

---

## Write File Using fs/promises

Code:

```js
import fs from "fs/promises";

const writeFileExample = async () => {
  try {
    console.log("Start");

    await fs.writeFile(
      "./files/promise-output.txt",
      "This file is created using fs promises."
    );

    console.log("File written successfully");

    console.log("End");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

writeFileExample();
```

Output:

```txt
Start
File written successfully
End
```

Created file:

```txt
nodejs-core/files/promise-output.txt
```

---

## Append File Using fs/promises

Code:

```js
import fs from "fs/promises";

const appendFileExample = async () => {
  try {
    console.log("Start");

    await fs.appendFile(
      "./files/promise-output.txt",
      "\nThis line is appended using fs promises."
    );

    console.log("Data appended successfully");

    console.log("End");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

appendFileExample();
```

Output:

```txt
Start
Data appended successfully
End
```

---

## Read Folder Using fs/promises

Code:

```js
import fs from "fs/promises";

const readFolderExample = async () => {
  try {
    console.log("Start");

    const files = await fs.readdir("./files");

    console.log("Files:", files);

    console.log("End");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

readFolderExample();
```

Example output:

```txt
Start
Files: [ 'notes.txt', 'promise-output.txt' ]
End
```

---

## Check File Exists Using fs/promises

With `fs/promises`, we can use `fs.access()` to check if a file or folder is accessible.

Code:

```js
import fs from "fs/promises";

const checkFileExists = async () => {
  try {
    await fs.access("./files/notes.txt");

    console.log("File exists");
  } catch (error) {
    console.log("File does not exist");
  }
};

checkFileExists();
```

Output:

```txt
File exists
```

If file does not exist:

```txt
File does not exist
```

---

## Delete File Using fs/promises

Code:

```js
import fs from "fs/promises";

const deleteFileExample = async () => {
  try {
    await fs.unlink("./files/async-output.txt");

    console.log("File deleted successfully");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

deleteFileExample();
```

Output:

```txt
File deleted successfully
```

If file does not exist:

```txt
Error: ENOENT: no such file or directory
```

---

## Sync API vs Callback API vs Promise API

```txt
Sync API
↓
Blocks next line
Example: readFileSync, writeFileSync

Callback API
↓
Does not block next line
Uses callback function
Example: readFile, writeFile

Promise API
↓
Does not block next line
Works with async/await
Example: fs/promises
```

---

## Key Learning

In Day 7, we learned:

```txt
fs means File System
fs is a built-in Node.js module
Node.js can read, write, append, and delete files
Node.js can create folders and read folder contents
utf-8 converts file data into readable text
Without utf-8, Node.js returns Buffer
writeFileSync overwrites content
appendFileSync adds content at the end
readFileSync is synchronous and blocking
readFile is asynchronous and callback-based
fs/promises works with async/await
fs.access checks whether a file exists
fs.unlink deletes a file
Modern Node.js projects commonly use fs/promises
```

# Day 8: Path Module

## Objective

The objective of Day 8 is to understand the Node.js `path` module.

The `path` module helps us work with file and folder paths safely.

It is useful when working with files using the `fs` module.

---

## What is path Module?

`path` is a built-in Node.js module.

It helps us create, read, and manage file paths.

Example paths:

```txt
./files/notes.txt
/home/user/project/files/notes.txt
C:\Users\Lavesh\project\files\notes.txt
```

Different operating systems use different path separators.

Linux, Ubuntu, and Mac use:

```txt
/
```

Windows uses:

```txt
\
```

So instead of manually writing paths, we use the Node.js `path` module.

---

## Why path Module is Useful

The `path` module helps us:

```txt
Create safe file paths
Work across Windows, Linux, and Mac
Avoid path separator issues
Get file name from path
Get folder name from path
Get file extension
Create absolute paths
Use file paths safely with fs module
```

---

## Import path Module

Code:

```js
import path from "path";
```

`path` is a built-in Node.js module, so we do not need to install it.

---

## path.join()

`path.join()` joins multiple path parts safely.

Code:

```js
import path from "path";

const filePath = path.join("files", "notes.txt");

console.log(filePath);
```

Output on Linux, Ubuntu, or Mac:

```txt
files/notes.txt
```

Output on Windows:

```txt
files\notes.txt
```

---

## Why path.join() is Useful

Instead of manually writing:

```js
"./files/notes.txt"
```

we can write:

```js
path.join("files", "notes.txt");
```

This creates the correct path based on the operating system.

---

## Using path.join() with fs

Code:

```js
import fs from "fs";
import path from "path";

const filePath = path.join("files", "notes.txt");

const data = fs.readFileSync(filePath, "utf-8");

console.log(data);
```

Output:

```txt
This is my first fs module note.
```

Flow:

```txt
path.join()
↓
Creates safe file path
↓
fs.readFileSync()
↓
Reads file content
```

---

## path.resolve()

`path.resolve()` creates an absolute path.

Code:

```js
import path from "path";

const relativePath = path.join("files", "notes.txt");

const absolutePath = path.resolve("files", "notes.txt");

console.log("Relative path:", relativePath);

console.log("Absolute path:", absolutePath);
```

Example output:

```txt
Relative path: files/notes.txt
Absolute path: /home/userThis is my first fs module note.
```

Flow:

```txt
path.join()
↓
Creates safe file path
↓
fs.readFileSync()
↓
Reads file content
```

---

## path.resolve()

`path.resolve()` creates an absolute path.

Code:

```js
import path from "path";

const relativePath = path.join("files", "notes.txt");

const absolutePath = path.resolve("files", "notes.txt");

console.log("Relative path:", relativePath);

console.log("Absolute path:", absolutePath);
```

Example output:

```txt
Relative path: files/notes.txt
Absolute path: /home/project/nodejs-core/files/notes.txt
```

---

## path.join() vs path.resolve()

```txt
path.join()
↓
Joins path parts

path.resolve()
↓
Creates full absolute path from current working directory
```

---

## path.basename()

`path.basename()` returns the last part of a path.

Usually, it returns the file name.

Code:

```js
import path from "path";

const filePath = path.resolve("files", "notes.txt");

const fileName = path.basename(filePath);

console.log("Full path:", filePath);

console.log("File name:", fileName);
```

Output:

```txt
Full path: /home/.../nodejs-core/files/notes.txt
File name: notes.txt
```

---

## path.dirname()

`path.dirname()` returns the folder path from a file path.

Code:

```js
import path from "path";

const filePath = path.resolve("files", "notes.txt");

const folderPath = path.dirname(filePath);

console.log("Full path:", filePath);

console.log("Folder path:", folderPath);
```

Output:

```txt
Full path: /home/.../nodejs-core/files/notes.txt
Folder path: /home/.../nodejs-core/files
```

---

## path.extname()

`path.extname()` returns the file extension.

Code:

```js
import path from "path";

const filePath = path.resolve("files", "notes.txt");

const extension = path.extname(filePath);

console.log("Full path:", filePath);

console.log("Extension:", extension);
```

Output:

```txt
Full path: /home/.../nodejs-core/files/notes.txt
Extension: .txt
```

Examples:

```txt
notes.txt       → .txt
image.png       → .png
server.js       → .js
archive.tar.gz  → .gz
```

---

## path.parse()

`path.parse()` breaks a path into different parts.

Code:

```js
import path from "path";

const filePath = path.resolve("files", "notes.txt");

const parsedPath = path.parse(filePath);

console.log(parsedPath);
```

Example output:

```js
{
  root: "/",
  dir: "/home/.../nodejs-core/files",
  base: "notes.txt",
  ext: ".txt",
  name: "notes"
}
```

---

## path.parse() Output Meaning

```txt
root
↓
Root directory

dir
↓
Folder path

base
↓
Full file name with extension

ext
↓
File extension

name
↓
File name without extension
```

---

## __dirname in ES Modules

In CommonJS, Node.js provides:

```js
__dirname
```

It means:

```txt
Current file folder path
```

But in ES Modules, `__dirname` is not directly available.

Because our project uses ES Modules, we need to create it manually.

---

## Creating __filename and __dirname in ES Modules

Code:

```js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log("File name:", __filename);

console.log("Directory name:", __dirname);
```

Example output:

```txt
File name: /home/.../nodejs-core/app.js
Directory name: /home/.../nodejs-core
```

---

## Meaning of import.meta.url

`import.meta.url` gives the current file URL.

Example:

```txt
file:///home/.../nodejs-core/app.js
```

But this is a file URL, not a normal file path.

So we convert it using:

```js
fileURLToPath(import.meta.url);
```

---

## Meaning of __filename and __dirname

```txt
__filename
↓
Full path of current file

__dirname
↓
Folder path of current file
```

---

## Using __dirname with fs

Code:

```js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "notes.txt");

const data = fs.readFileSync(filePath, "utf-8");

console.log("File path:", filePath);

console.log("File content:", data);
```

Output:

```txt
File path: /home/.../nodejs-core/files/notes.txt
File content: This is my first fs module note.
```

---

## Why __dirname is Useful

Using only relative path:

```js
"./files/notes.txt"
```

depends on where the command is executed from.

Using `__dirname` creates a path based on the current file location.

Example:

```js
const filePath = path.join(__dirname, "files", "notes.txt");
```

This is safer and more reliable.

---

## Final Useful Pattern

For ES Modules, this is a common useful pattern:

```js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
```

Then use it like this:

```js
const filePath = path.join(__dirname, "files", "notes.txt");
```

---

## Common path Methods

```txt
path.join()
↓
Joins path parts safely

path.resolve()
↓
Creates absolute path

path.basename()
↓
Returns file name

path.dirname()
↓
Returns folder path

path.extname()
↓
Returns file extension

path.parse()
↓
Returns path details as object
```

---

## Key Learning

In Day 8, we learned:

```txt
path is a built-in Node.js module
path helps work with file and folder paths
Different operating systems use different path separators
path.join creates safe paths
path.resolve creates absolute paths
path.basename returns file name
path.dirname returns folder path
path.extname returns file extension
path.parse breaks path into parts
__dirname is not directly available in ES Modules
import.meta.url can be converted into file path
__dirname is useful with fs module
Using path with fs makes file handling safer
```

# Day 9: Process Object

## Objective

The objective of Day 9 is to understand the Node.js `process` object.

The `process` object gives information and control over the currently running Node.js program.

---

## What is process Object?

`process` is a global object in Node.js.

Global means we can use it directly without importing it.

Example:

```js
console.log(process.version);
```

No import is required.

The `process` object provides information about:

```txt
Node.js version
Operating system platform
Current working directory
Environment variables
Command-line arguments
Memory usage
Process uptime
Process exit
```

---

## Basic Process Information

Code:

```js
console.log("Node version:", process.version);

console.log("Platform:", process.platform);

console.log("Process ID:", process.pid);
```

Example output:

```txt
Node version: v22.22.0
Platform: linux
Process ID: 12345
```

---

## Meaning

```txt
process.version
↓
Shows current Node.js version

process.platform
↓
Shows operating system platform

process.pid
↓
Shows current Node.js process ID
```

---

## process.cwd()

`cwd` means Current Working Directory.

`process.cwd()` tells us from which folder the Node.js command is running.

Code:

```js
console.log("Current working directory:", process.cwd());
```

Run:

```bash
node app.js
```

Example output:

```txt
Current working directory: /home/user/project/nodejs-core
```

---

## Important Point About process.cwd()

`process.cwd()` depends on where the command is executed from.

Example:

```bash
node nodejs-core/app.js
```

If this command is run from the project root, then:

```txt
process.cwd()
↓
Project root folder
```

Even though the file is inside:

```txt
nodejs-core/app.js
```

---

## process.cwd() vs __dirname

`process.cwd()` and `__dirname` are different.

Code:

```js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log("process.cwd():", process.cwd());

console.log("__dirname:", __dirname);
```

---

## Difference

```txt
process.cwd()
↓
Folder from where node command is executed

__dirname
↓
Folder where current file exists
```

`process.cwd()` can change depending on where the command runs.

`__dirname` stays based on the current file location.

---

## process.env

`process.env` stores environment variables available to the Node.js process.

In backend projects, we commonly use environment variables for:

```txt
PORT
MONGO_URI
JWT_SECRET
SMTP_USER
CLOUDINARY_API_KEY
NODE_ENV
```

Example:

```js
console.log("NODE_ENV:", process.env.NODE_ENV);

console.log("HOME:", process.env.HOME);
```

---

## System Environment Variables

Some environment variables are provided by the operating system.

Example on Linux or Ubuntu:

```txt
HOME
PATH
USER
SHELL
PWD
LANG
```

That is why this can work without a `.env` file:

```js
console.log(process.env.HOME);
```

Because `HOME` is already available in the system environment.

---

## .env File and dotenv

A `.env` file is just a normal file.

Node.js does not read `.env` automatically.

Example `.env`:

```env
NODE_ENV=development
```

This value will not be available in `process.env.NODE_ENV` unless we load it using `dotenv`.

Example:

```js
import "dotenv/config";

console.log(process.env.NODE_ENV);
```

---

## process.env Rule

```txt
process.env
↓
Reads environment variables available to the Node.js process

.env file
↓
Normal file containing environment variables

dotenv
↓
Loads .env file values into process.env
```

Final flow:

```txt
.env
↓
dotenv/config
↓
process.env
```

---

## Passing Environment Variable from Terminal

We can also pass environment variables directly from terminal.

Example:

```bash
NODE_ENV=development node app.js
```

Then this code:

```js
console.log(process.env.NODE_ENV);
```

Will output:

```txt
development
```

---

## process.argv

`process.argv` stores command-line arguments.

Code:

```js
console.log(process.argv);
```

Run:

```bash
node app.js
```

Example output:

```txt
[
  "/usr/bin/node",
  "/path/to/nodejs-core/app.js"
]
```

Run with arguments:

```bash
node app.js Lavesh React Node
```

Example output:

```txt
[
  "/usr/bin/node",
  "/path/to/nodejs-core/app.js",
  "Lavesh",
  "React",
  "Node"
]
```

---

## process.argv Meaning

```txt
process.argv[0]
↓
Node.js executable path

process.argv[1]
↓
Current file path

process.argv[2]
↓
First custom argument

process.argv[3]
↓
Second custom argument
```

---

## Using Command-line Arguments

Code:

```js
const name = process.argv[2];
const role = process.argv[3];

console.log("Name:", name);
console.log("Role:", role);
```

Run:

```bash
node app.js Lavesh "React Developer"
```

Output:

```txt
Name: Lavesh
Role: React Developer
```

---

## Why Quotes are Used

We used:

```bash
"React Developer"
```

Because it has a space.

Without quotes:

```bash
node app.js Lavesh React Developer
```

Node.js treats them as separate arguments:

```txt
process.argv[2] → Lavesh
process.argv[3] → React
process.argv[4] → Developer
```

---

## process.uptime()

`process.uptime()` tells how many seconds the current Node.js process has been running.

Code:

```js
console.log("Process started");

setTimeout(() => {
  console.log("Uptime:", process.uptime(), "seconds");
}, 3000);
```

Example output:

```txt
Process started
Uptime: 3.00 seconds
```

This is useful in health check APIs.

---

## process.memoryUsage()

`process.memoryUsage()` returns memory usage details of the current Node.js process.

Code:

```js
const memoryUsage = process.memoryUsage();

console.log(memoryUsage);
```

Example output:

```txt
{
  rss: 43286528,
  heapTotal: 5603328,
  heapUsed: 4398120,
  external: 1491893,
  arrayBuffers: 10515
}
```

---

## Memory Usage Fields

```txt
rss
↓
Total memory used by Node.js process

heapTotal
↓
Total memory allocated for JavaScript objects

heapUsed
↓
Memory currently used by JavaScript objects

external
↓
Memory used by C++ objects connected to JavaScript
```

---

## Convert Memory Bytes to MB

Memory values come in bytes.

To convert bytes to MB:

```txt
bytes / 1024 = KB
KB / 1024 = MB
```

Code:

```js
const memoryUsage = process.memoryUsage();

console.log("RSS:", Math.round(memoryUsage.rss / 1024 / 1024), "MB");

console.log("Heap Total:", Math.round(memoryUsage.heapTotal / 1024 / 1024), "MB");

console.log("Heap Used:", Math.round(memoryUsage.heapUsed / 1024 / 1024), "MB");
```

Example output:

```txt
RSS: 42 MB
Heap Total: 5 MB
Heap Used: 4 MB
```

---

## process.exit()

`process.exit()` stops the current Node.js process.

Code:

```js
console.log("Before exit");

process.exit(0);

console.log("After exit");
```

Output:

```txt
Before exit
```

This line does not run:

```js
console.log("After exit");
```

Because `process.exit()` stops the program immediately.

---

## Exit Code Meaning

```txt
process.exit(0)
↓
Successful exit

process.exit(1)
↓
Exit because of error
```

---

## Common process Properties and Methods

```txt
process.version
↓
Node.js version

process.platform
↓
Operating system platform

process.pid
↓
Current process ID

process.cwd()
↓
Current working directory

process.env
↓
Environment variables

process.argv
↓
Command-line arguments

process.uptime()
↓
Process running time in seconds

process.memoryUsage()
↓
Memory usage details

process.exit()
↓
Stops the Node.js process
```

---

## Key Learning

In Day 9, we learned:

```txt
process is a global object in Node.js
process gives information about current Node.js program
process.version shows Node.js version
process.platform shows operating system
process.pid shows process ID
process.cwd() shows command running folder
process.cwd() is different from __dirname
process.env reads environment variables
.env file needs dotenv to load values into process.env
process.argv reads command-line arguments
process.uptime() shows running time
process.memoryUsage() shows memory usage
process.exit() stops the process
```