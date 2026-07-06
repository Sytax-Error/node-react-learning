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