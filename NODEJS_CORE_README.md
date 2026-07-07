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