# Node.js + Express.js + React Learning Notes

## License

This project is licensed under the MIT License.

You are free to use this project for learning and reference purposes.
You cannot directly modify this original repository unless you are added as a collaborator.

See the LICENSE file for details.

---

## Usage

This repository is public for learning and reference purposes.

You are free to:
- View the code
- Use it for learning
- Fork the repository
- Use the code in your own project as per the license

You cannot directly modify this original repository unless you are added as a collaborator.

## Learning Pattern


This project covers **Node.js fundamentals** side by side with **Express.js practical backend development**.

```txt
Node.js fundamentals
   ↓
Express.js backend APIs
   ↓
React.js frontend integration
   ↓
MERN stack practical understanding
```

For every topic, notes should be short and useful for revision.

```txt
Topic
Meaning
Why we use it
Where it is used
Small rule/example
```

---

## Practice Exercises

Revision and self-check exercises are available here:

[Node.js + Express.js Practice Exercises](./EXERCISES.md)



## Backend Basic Flow

```txt
Client / React
   ↓
Sends API request
   ↓
Express route receives request
   ↓
Backend processes data
   ↓
Backend sends JSON response
   ↓
React updates UI
```

---

# Day 1: Basic Node.js + Express Server

## Topics Learned

```txt
Node.js basics
Express.js basics
Creating backend server
GET API
req and res
JSON response
Port
package.json
```

---

## Node.js

Node.js allows JavaScript to run outside the browser.

Used for:

```txt
Backend APIs
Server-side logic
Database connection
Authentication
File handling
Real-time apps
```

---

## Express.js

Express.js is a Node.js framework used to create backend APIs easily.

Common uses:

```txt
Create routes
Handle requests
Send responses
Use middleware
Build REST APIs
```

---

## npm init

`npm init -y` creates `package.json`.

`package.json` stores project information, scripts, and installed packages.

---

## package.json

`package.json` is the identity file of a Node.js project.

It contains:

```txt
project name
version
scripts
dependencies
devDependencies
```

---

## Port

Port is like a door number for an application.

Example:

```txt
React app    → localhost:5173
Node backend → localhost:5000
```

Same computer can run multiple apps using different ports.

---

## Basic Terms

| Term           | Meaning                               |
| -------------- | ------------------------------------- |
| `req`          | Incoming request from frontend/client |
| `res`          | Response sent from backend            |
| `res.send()`   | Sends text response                   |
| `res.json()`   | Sends JSON response                   |
| `app.listen()` | Starts backend server                 |
| `app.get()`    | Creates GET API                       |

---

## Browser and API Testing

Browser is mostly used for testing `GET` APIs.

For `POST`, `PUT`, and `DELETE`, use:

```txt
Thunder Client
Postman
curl
React form
```

---

# Day 2: CRUD APIs in Express

## Topics Learned

```txt
GET
POST
PUT
DELETE
CRUD
req.body
req.params
express.json()
validation
trim()
status codes
in-memory data
```

---

## CRUD Meaning

```txt
C → Create  → POST
R → Read    → GET
U → Update  → PUT
D → Delete  → DELETE
```

---

## HTTP Methods

| Method | Purpose              |
| ------ | -------------------- |
| GET    | Read/fetch data      |
| POST   | Create new data      |
| PUT    | Update existing data |
| DELETE | Remove data          |

---

## express.json()

`express.json()` allows Express to read JSON data sent from frontend/Postman/Thunder Client.

Without it, `req.body` may be `undefined`.

---

## req.body

`req.body` contains data sent in request body.

Mostly used in:

```txt
POST
PUT
PATCH
```

Example use case:

```txt
Frontend sends form data.
Backend reads it from req.body.
```

---

## req.params

`req.params` contains dynamic values from URL.

Example:

```txt
/api/users/:id
```

Here `id` is available in:

```txt
req.params.id
```

`req.params.id` usually comes as a string, so convert it when comparing with number IDs.

---

## JSON Rule

Valid JSON must use double quotes for keys and string values.

Correct:

```json
{
  "name": "Rahul",
  "role": "Node Developer"
}
```

Wrong:

```js
{
  name: "Rahul",
  role: "Node Developer"
}
```

---

## One Object vs Array

Current `POST /api/users` accepts one user object at a time.

Correct:

```json
{
  "name": "Rahul",
  "role": "Node Developer"
}
```

Array body is different and needs separate backend logic.

Example array:

```json
[
  {
    "name": "Rahul",
    "role": "Node Developer"
  }
]
```

---

## Validation

Frontend validation improves user experience.

Backend validation is required for safety.

```txt
Never depend only on frontend validation.
Always validate data on backend also.
```

---

## trim()

`trim()` removes extra spaces from input values.

Useful for blocking values like:

```txt
"     "
```

Also useful for saving clean data.

---

## Date.now()

`Date.now()` returns current timestamp.

We used it to create temporary unique IDs.

Example:

```txt
1781160698680
```

In real projects, the database usually creates IDs automatically.

---

## In-memory Data

Currently users/projects are stored in arrays.

This is temporary.

```txt
Server restart → array data is lost
Database later → data becomes permanent
```

---

## Status Codes

```txt
2xx = Success
4xx = Client/frontend/user mistake
5xx = Backend/server mistake
```

| Code | Meaning      | Use Case                         |
| ---- | ------------ | -------------------------------- |
| 200  | OK           | Request successful               |
| 201  | Created      | New data created                 |
| 400  | Bad Request  | Missing/wrong input              |
| 401  | Unauthorized | User not logged in/token missing |
| 403  | Forbidden    | User logged in but no permission |
| 404  | Not Found    | Requested data not found         |
| 409  | Conflict     | Duplicate data already exists    |
| 500  | Server Error | Backend/server problem           |

---

## CRUD Status Code Guide

| API Action      | Success | Error     |
| --------------- | ------- | --------- |
| Get all data    | 200     | 500       |
| Get single data | 200     | 404       |
| Create data     | 201     | 400       |
| Update data     | 200     | 400 / 404 |
| Delete data     | 200     | 404       |

---

# Day 3: React + Node.js Integration

## Topics Learned

```txt
CORS
fetch API
React form submit
GET users from backend
POST user from React
PUT user from React
DELETE user from React
frontend validation
backend error handling
loading state
error state
empty list message
API base URL
```

---

## CORS

CORS allows React frontend and Node backend to communicate when they run on different ports.

Example:

```txt
React frontend → localhost:5173
Node backend   → localhost:5000
```

Without CORS, browser may block frontend API requests.

---

## React + Backend Flow

```txt
React form submit
   ↓
fetch() API call
   ↓
Node/Express route
   ↓
Backend validates data
   ↓
Backend sends response
   ↓
React updates state/UI
```

---

## React API Concepts

| Concept           | Meaning                           |
| ----------------- | --------------------------------- |
| `fetch()`         | Calls backend API                 |
| `response.json()` | Converts JSON response to JS data |
| `response.ok`     | Checks success/error status       |
| `useEffect()`     | Calls API on page load            |
| `useState()`      | Stores API data/input values      |

---

## API Base URL

Instead of repeating backend URL many times, use one constant.

```txt
API_BASE_URL = backend base address
```

Benefit:

```txt
If backend URL changes, update only one place.
```

Example:

```txt
Development backend → http://localhost:5000
Production backend  → deployed API URL
```

---

## React Form Submit

HTML form reloads the page by default.

In React, use `e.preventDefault()` to stop page refresh.

---

## Controlled Input

Input value is controlled by React state.

```txt
input value → React state
onChange    → update state
```

This makes form data easy to manage.

---

## Frontend Validation

Frontend validation stops wrong input before API call.

Example:

```txt
Empty input → show alert → do not call API
```

Important:

```txt
Frontend validation is for user experience.
Backend validation is for security and correctness.
```

---

## response.ok

`response.ok` checks if API response is successful.

```txt
true  → status 200/201
false → status 400/404/500
```

Useful for showing backend error messages in React.

---

## Loading State

Loading state is used when API request is running.

```txt
loading true  → show "Loading..."
loading false → hide loading message
```

---

## Error State

Error state is used when API request fails.

Example:

```txt
Backend stopped
   ↓
React fetch fails
   ↓
Show "Failed to fetch users"
```

---

## Empty List Message

When API is successful but array is empty, show:

```txt
No users found
```

This is better than showing an empty page.

---

## try...catch...finally

Used to handle API errors safely.

```txt
try     → API logic
catch   → Error handling
finally → Always runs
```

Use this when API can fail because of:

```txt
backend stopped
network issue
wrong API URL
server crash
```

---

## Add / Edit Mode

`editUserId` tells whether form is in add mode or edit mode.

```txt
editUserId = null   → Add User
editUserId has value → Update User
```

---

## Update UI Without Refresh

After POST, PUT, or DELETE, update React state manually.

```txt
POST   → add new item in state
PUT    → replace updated item in state
DELETE → filter removed item from state
```

This makes UI update without page refresh.

---

# Day 4: Backend Structure + Node.js Modules

## Topics Learned

```txt
Backend folder structure
Node.js modules
import/export
Express Router
Route mounting
File scope
let vs const
Controllers
```

---

## Backend Folder Structure

Clean backend structure:

```txt
src/
  server.js
  routes/
  controllers/
  models/
  middleware/
  config/
```

---

## server.js Responsibility

```txt
Create Express app
Use middleware
Mount routes
Start server
```

`server.js` should not contain all route logic in large projects.

---

## routes Responsibility

```txt
Define API paths
Connect API routes to controller logic
Keep server.js clean
```

Route file should mainly answer:

```txt
Which method?
Which URL?
Which controller function?
```

---

## controllers Responsibility

Controllers contain the actual API logic.

```txt
Routes define API paths.
Controllers handle request and response logic.
```

Flow:

```txt
server.js
  ↓
routes
  ↓
controllers
```

Benefit:

```txt
Keeps route files clean
Makes code easier to manage
Useful for large projects
```

---

## Node.js Modules

A module means one file can export something and another file can import it.

Used for splitting code into separate files.

```txt
export → share from file
import → use in another file
```

---

## .js Extension in Node ES Modules

In Node.js ES Modules, local imports need `.js` extension.

Correct:

```txt
./routes/userRoutes.js
```

Wrong:

```txt
./routes/userRoutes
```

If `.js` is missing, Node may throw:

```txt
ERR_MODULE_NOT_FOUND
```

---

## Express Router

`express.Router()` creates a separate route handler.

It helps split APIs into separate files.

Example flow:

```txt
server.js mounts route
routes file defines endpoints
controller handles logic
```

---

## Route Mounting

If `server.js` has base route:

```txt
/api/users
```

and route file has:

```txt
/
```

Final API becomes:

```txt
/api/users
```

If route file has:

```txt
/:id
```

Final API becomes:

```txt
/api/users/:id
```

---

## File Scope

Variables created inside one file are available only inside that file.

To use values in another file, use:

```txt
export
import
```

---

## let vs const

```txt
let   → can reassign value
const → cannot reassign value
```

For arrays:

```txt
const array = []
array.push() is allowed
array = [] is not allowed
```

Why we used `let users = []`:

```txt
Because DELETE route reassigns users using filter().
```

---

## Route File vs Controller File

```txt
routes     → what URL and method
controller → what should happen
```

Example:

```txt
GET /api/users     → route
Get all users logic → controller
```

---

## Why Separate Files?

Separating files helps with:

```txt
clean code
easy debugging
better project structure
team work
large project management
```

---

# Current Completed APIs

## Users

```txt
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

## Projects

```txt
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

---

# Quick Revision

## Node.js

```txt
Runs JavaScript outside browser.
Used for backend/server-side development.
```

## Express.js

```txt
Framework built on Node.js.
Used to create APIs easily.
```

## REST API

```txt
API that uses HTTP methods like GET, POST, PUT, DELETE.
```

## Middleware

```txt
Function that runs before route/controller logic.
Used for JSON parsing, CORS, auth, logging, error handling.
```

## req

```txt
Request coming from frontend/client.
```

## res

```txt
Response sent by backend.
```

## req.body

```txt
Data sent in request body.
Used in POST/PUT.
```

## req.params

```txt
Dynamic data from URL.
Used for IDs.
```

## res.status()

```txt
Sets HTTP status code.
```

## res.json()

```txt
Sends JSON response.
```


## Controller Functions

Controller functions contain the actual API logic.

Examples:

```txt
getUsers      → get all users
createUser    → create new user
getUserById   → get single user
updateUser    → update user
deleteUser    → delete user

```

# Day 5: Middleware + dotenv

## Topics Learned

```txt
Middleware
next()
Request-response cycle
Custom middleware
dotenv
process.env
Environment variables
PORT from .env
```

---

## Middleware

Middleware is a function that runs between the request and the final route/controller.

Flow:

```txt
Client request
   ↓
Middleware
   ↓
Route
   ↓
Controller
   ↓
Response
```

Middleware is used for:

```txt
Logging requests
Reading JSON body
CORS handling
Authentication
Validation
Error handling
```

## Important Middleware Rule

Middleware has access to:

```txt
req  → incoming request
res  → outgoing response
next → move request to next middleware/route
```

Middleware must do one of these two things:

```txt
1. Send response using res
OR
2. Call next()
```

If middleware does not call `next()` and also does not send response, the request will get stuck.

Example:

```txt
Request keeps loading
No response comes back
API does not reach route/controller
```

## next()

`next()` tells Express:

```txt
This middleware work is done.
Move to the next middleware or route.
```

Without `next()`:

```txt
Request stops inside middleware.
```

## Middleware Flow

```txt
Client request
   ↓
cors()
   ↓
express.json()
   ↓
custom logger middleware
   ↓
routes
   ↓
controllers
   ↓
response
```

## Custom Logger Middleware

Logger middleware is used to print request information in terminal.

It helps during development to see which API is being called.

Example output:

```txt
GET /api/users
POST /api/users
PUT /api/users/123
DELETE /api/users/123
```

## Middleware Summary

```txt
Middleware runs before route/controller.
Middleware can read or modify req/res.
Middleware is useful for logging, auth, validation, JSON parsing, CORS, and error handling.
Always call next() if middleware should continue the request.
```

## Middleware Folder

Middleware files are kept inside the `middleware` folder.

Purpose:

```txt
Keep server.js clean
Separate middleware logic
Reuse middleware in multiple routes
Make project structure professional

## dotenv

`dotenv` is used to load environment variables from a `.env` file into Node.js.

Environment variables are used for configuration values.

Common examples:

```txt
PORT
MONGO_URI
JWT_SECRET
API_KEY
NODE_ENV
```

## Why use .env?

```txt
Avoid hardcoding config values
Keep secrets outside main code
Easy to change values for development/production
Useful for deployment
```

## process.env

`process.env` is used to access environment variables in Node.js.

Example:

```txt
process.env.PORT
process.env.MONGO_URI
process.env.JWT_SECRET
```

## Important Rule

`.env` file should not be pushed to GitHub if it contains secret values.

Use `.env.example` to show required variable names.


## .env vs .env.example

`.env` contains real environment values.

Example:

```txt
PORT=5000
MONGO_URI=real_database_url
JWT_SECRET=real_secret_key
```

## What you learned in Day 5
``` text
Middleware runs before route/controller.
next() moves request forward.
If next() is not called and response is not sent, request gets stuck.
Custom middleware can be moved into middleware folder.
dotenv loads .env values into process.env.
PORT should come from process.env.PORT.
.env should not be pushed to GitHub.
.env.example should be pushed as sample config.

```

# Day 6: Error Handling Middleware

## Topics Learned

```txt
404 route not found
Global error middleware
Error handling flow
next(error)
Centralized error response
```

## Why Error Handling?

Error handling is used to send proper response when something goes wrong in backend.

Examples:

```txt
API route not found
User not found
Invalid request
Database error
Server crash
```

## 404 Route Not Found

404 is used when API route does not exist.

Example:

```txt
GET /api/unknown
```

Response:

```txt
404 Not Found
```

## Global Error Middleware

Global error middleware handles errors from all routes/controllers in one place.

Benefit:

```txt
No repeated error response code
Cleaner controllers
Consistent error format
Easy debugging
```

## next(error)

`next(error)` sends error to global error middleware.

Normal middleware:

```txt
(req, res, next)
```

Error middleware:

```txt
(error, req, res, next)
```

## Error Handling Flow

```txt
Client request
   ↓
Route
   ↓
Controller
   ↓
Error occurs
   ↓
next(error)
   ↓
Global error middleware
   ↓
Error response
```

## Important Rule

In Express, error middleware must have 4 parameters:

```txt
(error, req, res, next)
If it does not have 4 parameters, Express will not treat it as error middleware.
```

## 404 Not Found Middleware

404 middleware handles requests for routes that do not exist.

Example:

```txt
GET /api/wrong-url

Response:

{
  "message": "Route not found: /api/wrong-url"
}

Important:

404 middleware should be placed after all valid routes.

Reason:

Express checks middleware/routes from top to bottom.
If no route matches, 404 middleware runs.

Flow:

Request
   ↓
Valid routes
   ↓
No route matched
   ↓
404 middleware
   ↓
404 response

```

## Create global error middleware
   ```txt
   Now we will create one middleware that handles backend errors from controllers.

   Create this file:

   src/middleware/errorMiddleware.js

   `Important concept`

   Normal middleware has 3 parameters:

   (req, res, next)

   Error middleware has 4 parameters:

   (error, req, res, next)
   
   ```

## next() vs next(error)

`next()` is used to continue normal request flow.

`next(error)` is used to send an error to global error middleware.

```txt
next()       → next middleware/route
next(error) → error middleware
```

## 404 Not Found Middleware

404 middleware handles requests for routes that do not exist.

Instead of sending response directly, it creates an error and passes it to global error middleware.

Flow:

```txt
Wrong API request
   ↓
notFoundMiddleware
   ↓
Create Error object
   ↓
Set status 404
   ↓
next(error)
   ↓
errorMiddleware
   ↓
JSON error response

Important:

404 middleware should be placed after all valid routes.
errorMiddleware should be placed after 404 middleware.
```
---

## Error Middleware Status Code

Default Express status code is `200`.

If an error happens and no error status is set, we should not send `200`.

So global error middleware uses fallback status:

```txt
If status is still 200 → use 500
Otherwise → use existing status code
```

## Day 6 Summary

Error handling middleware makes backend responses consistent.

Final error flow:

```txt
Request
   ↓
Routes
   ↓
Controller
   ↓
If route not found → notFoundMiddleware
   ↓
If error occurs → next(error)
   ↓
errorMiddleware
   ↓
JSON error response
```
`Important rules:`
```txt
404 middleware should be after all routes.
Error middleware should be after 404 middleware.
Error middleware must have 4 parameters.
Use next(error) to send error to global error middleware.
If no error status is set, use 500 as fallback.

```

# Day 7: Async Error Handling

## Topics Learned

```txt
async / await
try...catch in controllers
async controller errors
asyncHandler utility
clean controller pattern
```

## Why Async Handling?

In Node.js, many backend operations are asynchronous.

Examples:

```txt
Database queries
API calls
File operations
Password hashing
Token verification
Email sending
```

## async / await

`async / await` is used to handle asynchronous code in a clean way.

```txt
async → function may contain asynchronous code
await → wait for async operation to complete
```

## try...catch

`try...catch` is used to catch errors in async code.

```txt
try   → run async logic
catch → handle error
```

## Problem Without Proper Async Error Handling

If an async controller throws an error and it is not handled, backend may crash or response may not be sent properly.

## asyncHandler

`asyncHandler` is a helper function used to avoid writing try...catch again and again in every async controller.

Benefit:

```txt
Cleaner controllers
Less repeated code
All async errors go to global error middleware
```

## Error Flow

```txt
Async controller
   ↓
Error occurs
   ↓
asyncHandler catches error
   ↓
next(error)
   ↓
Global error middleware
   ↓
JSON error response
```

## asyncHandler

`asyncHandler` is a reusable helper for async controllers.

It catches async errors and sends them to global error middleware.

Flow:

```txt
Async controller
   ↓
asyncHandler
   ↓
If error occurs
   ↓
catch(next)
   ↓
errorMiddleware
```

## Async Controller Pattern

All controllers can be wrapped with `asyncHandler`.

Pattern:

```txt
export const controllerName = asyncHandler(async (req, res) => {
  // controller logic
});

Why:

Keeps controller clean
Avoids repeated try...catch
Automatically sends errors to global error middleware
Ready for MongoDB/database operations

```
# Day 8: MongoDB + Mongoose Basics

## Why Database is Needed

Until now, backend data was stored in arrays:

```js
let users = [];
let tasks = [];
```

This data is temporary.

Problem:

```txt
Server restart → data deleted
```

A database stores application data permanently.

Examples:

```txt
Users
Tasks
Products
Orders
Login data
```

Backend flow with database:

```txt
Express API
↓
Mongoose
↓
MongoDB
```

---

## What is MongoDB?

MongoDB is a NoSQL database.

It stores data in JSON-like documents.

Example document:

```json
{
  "_id": "mongodb_generated_id",
  "name": "Lavesh",
  "role": "React Developer"
}
```

MongoDB terms:

```txt
Collection → group of documents
Document   → single record
Field      → property inside document
```

SQL comparison:

```txt
SQL Table  → MongoDB Collection
SQL Row    → MongoDB Document
SQL Column → MongoDB Field
```

---

## What is Mongoose?

Mongoose is a Node.js library used to work with MongoDB in a structured way.

Flow:

```txt
Express
↓
Mongoose
↓
MongoDB
```

Mongoose helps with:

```txt
Database connection
Schema
Model
Validation
CRUD operations
```

Install command:

```bash
npm install mongoose
```

---

## What is MONGO_URI?

`MONGO_URI` is the MongoDB connection string.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/node-react-learning
```

Meaning:

```txt
127.0.0.1             → local machine
27017                 → MongoDB default port
node-react-learning   → database name
```

---

## Environment Variables

`.env` contains real local configuration:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/node-react-learning
```

`.env` should not be pushed to GitHub.

`.env.example` contains sample configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## Local MongoDB Using Docker

MongoDB can run locally inside Docker.

Command:

```bash
docker run -d \
  --name node-learning-mongo \
  -p 27017:27017 \
  -v node-learning-mongo-data:/data/db \
  --restart unless-stopped \
  mongo:8.0
```

Useful Docker commands:

```bash
docker ps
docker start node-learning-mongo
docker stop node-learning-mongo
docker logs node-learning-mongo --tail 20
```

---

## Database Connection File

File:

```txt
src/config/db.js
```

Code:

```js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
```

---

## db.js Explanation

### mongoose.connect()

Connects Express backend with MongoDB.

```js
mongoose.connect(process.env.MONGO_URI);
```

### process.env.MONGO_URI

Reads MongoDB connection string from `.env`.

```js
process.env.MONGO_URI
```

### process.exit(1)

Stops the backend if database connection fails.

Reason:

```txt
If database is not connected, backend should not continue running incorrectly.
```

---

## Connect Database in server.js

```js
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();
```

Correct order:

```txt
dotenv.config()
↓
connectDB()
```

Reason:

```txt
connectDB() needs MONGO_URI from .env
```

---

## Successful Connection Output

```txt
MongoDB Connected: 127.0.0.1
Server is running on port 5000
```

This means:

```txt
MongoDB is running locally
Mongoose connected successfully
Express server is running
```

## Schema and Model

A schema defines the structure of data.

Example:

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});
```

Meaning:

```txt
name → string, required, removes extra spaces
role → string, required, removes extra spaces
```

A model is created from a schema and is used for database operations.

```js
export const User = mongoose.model("User", userSchema);
```

Model methods:

```txt
User.find()
User.create()
User.findById()
User.findByIdAndUpdate()
User.findByIdAndDelete()
```

`timestamps: true` automatically adds:

```txt
createdAt
updatedAt
```

Mongoose collection naming:

```txt
Model name: User
MongoDB collection: users
```

## MongoDB Document Response

When data is saved in MongoDB, MongoDB automatically adds `_id`.

Example:

```json
{
  "_id": "6a2f9e8b7e54f7fd2f4a81f7",
  "name": "Lavesh",
  "role": "React Developer",
  "createdAt": "2026-06-15T06:41:15.361Z",
  "updatedAt": "2026-06-15T06:41:15.361Z",
  "__v": 0
}
```

Meaning:

```txt
_id        → MongoDB generated unique id
createdAt  → added by timestamps: true
updatedAt  → added by timestamps: true
__v        → Mongoose internal version key
```

In array-based CRUD, we used custom `id`.

In MongoDB-based CRUD, we use `_id`.

### trim in Schema vs Controller

`trim: true` in Mongoose schema automatically removes extra spaces before saving string values.

Example:

```txt
"  React Developer  " → "React Developer"
```

## MongoDB ObjectId Validation

MongoDB `_id` uses ObjectId format.

Example valid ObjectId:

```txt
6a2f9e8b7e54f7fd2f4a81f7

Invalid id example:

32423fdf

Before using findById, findByIdAndUpdate, or findByIdAndDelete, validate the id.

if (!mongoose.Types.ObjectId.isValid(id)) {
  res.status(400);
  throw new Error("Invalid user id");
}

Error cases:

Invalid id format              → 400 Bad Request
Valid id format but not found  → 404 Not Found

```

## MongoDB CRUD with Mongoose

After creating a Mongoose model, we can use model methods to perform CRUD operations.

Example model:

```js
import { User } from "../models/userModel.js";
```

---

## Get All Documents

```js
const users = await User.find();
```

Meaning:

```txt
Find all users from MongoDB.
```

Used in:

```txt
GET /api/users
```

---

## Create Document

```js
const user = await User.create({
  name,
  role,
});
```

Meaning:

```txt
Create and save a new user document in MongoDB.
```

Used in:

```txt
POST /api/users
```

---

## Get Single Document by ID

```js
const user = await User.findById(id);
```

Meaning:

```txt
Find one user by MongoDB _id.
```

Used in:

```txt
GET /api/users/:id
```

---

## Update Document by ID

```js
const user = await User.findByIdAndUpdate(
  id,
  {
    name,
    role,
  },
  {
    returnDocument: "after",
    runValidators: true,
  }
);
```

Meaning:

```txt
Find user by _id and update it.
```

Options:

```txt
returnDocument: "after" → returns updated document
runValidators: true     → runs schema validation during update
```

Used in:

```txt
PUT /api/users/:id
```

---

## Delete Document by ID

```js
const user = await User.findByIdAndDelete(id);
```

Meaning:

```txt
Find user by _id and delete it.
```

Used in:

```txt
DELETE /api/users/:id
```

---

## ObjectId Validation

MongoDB `_id` has ObjectId format.

Before using id-based methods, validate the id:

```js
if (!mongoose.Types.ObjectId.isValid(id)) {
  res.status(400);
  throw new Error("Invalid user id");
}
```

Error handling:

```txt
Invalid id format             → 400 Bad Request
Valid id format but not found → 404 Not Found
```

Example invalid id:

```txt
32423fdf
```

Example valid ObjectId format:

```txt
64b7f2c9e4b0f3a1c2d4e5f6
```

---

## Mongoose CRUD Summary

```txt
User.find()              → get all users
User.create()            → create user
User.findById()          → get user by id
User.findByIdAndUpdate() → update user by id
User.findByIdAndDelete() → delete user by id
```

## Validators Utility

Common validation logic can be moved into a utility file to avoid repeated code.

File:

```txt
src/utils/validators.js
```

Code:

```js
import mongoose from "mongoose";

export const validateObjectId = (id, resourceName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ${resourceName} id`);
    error.statusCode = 400;
    throw error;
  }
};
```

Usage:

```js
validateObjectId(id, "user");
validateObjectId(id, "task");
```

Reason:

```txt
ObjectId validation is used in many APIs.
Moving it to a utility avoids repeated code.
```

Error flow:

```txt
validateObjectId()
↓
throws error with statusCode 400
↓
asyncHandler catches error
↓
errorMiddleware sends JSON response
```

Controller responsibility:

```txt
Validate request-specific fields
Call model methods
Check not found case
Send success response
```

## Mongoose Validation Error

Mongoose schema can validate data before saving it into MongoDB.

Example schema field:

```js
name: {
  type: String,
  required: true,
  trim: true,
}
```

If `name` is missing and `User.create()` is called, Mongoose throws a validation error.

Example response:

```json
{
  "message": "User validation failed: name: Path `name` is required."
}
```

Validation flow:

```txt
Controller
↓
Mongoose Model
↓
Schema Validation
↓
Validation Error
↓
asyncHandler
↓
errorMiddleware
↓
JSON Response
```

Controller validation gives clean custom API messages.

Example:

```js
if (!name || !role || !name.trim() || !role.trim()) {
  res.status(400);
  throw new Error("Name and role are required");
}
```

Final rule:

```txt
Controller validation → user-friendly API error
Schema validation     → database safety
```
## Handling Mongoose ValidationError

Mongoose can throw validation errors when schema rules fail.

Example schema rule:

```js
name: {
  type: String,
  required: true,
  trim: true,
}
```

If `name` is missing, Mongoose throws a `ValidationError`.

To return a cleaner API response, handle it inside `errorMiddleware.js`.

```js
export const errorMiddleware = (error, req, res, next) => {
  let statusCode =
    error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  let message = error.message || "Internal Server Error";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
  }

  res.status(statusCode).json({
    message,
  });
};
```

Example before handling:

```json
{
  "message": "User validation failed: name: Path `name` is required."
}
```

Example after handling:

```json
{
  "message": "Path `name` is required."
}
```

Purpose:

```txt
ValidationError → 400 Bad Request
Technical Mongoose message → cleaner API message
```
# Day 9 - 10: Registration and Authentication

## Authentication

Authentication means verifying the identity of a user.

Example:

```txt
User enters email and password
↓
Backend verifies user
↓
Backend allows access
```

Authentication answers:

```txt
Who are you?
```

---

## Authorization

Authorization means checking what an authenticated user is allowed to access.

Example:

```txt
Logged-in user can view profile
Admin user can manage users
Normal user cannot access admin APIs
```

Authorization answers:

```txt
What are you allowed to do?
```

---

## Registration

Registration means creating a new user account.

API:

```txt
POST /api/auth/register
```

Request body:

```json
{
  "name": "Lavesh",
  "email": "lavesh@test.com",
  "password": "123456"
}
```

Registration flow:

```txt
Read data from req.body
↓
Validate required fields
↓
Check if email already exists
↓
Hash password
↓
Save user in MongoDB
↓
Send response without password
```

---

## Packages Used for Authentication

```bash
npm install bcryptjs jsonwebtoken cookie-parser
```

Meaning:

```txt
bcryptjs      → hash password and compare password
jsonwebtoken  → create and verify JWT tokens
cookie-parser → read cookies in Express
```

---

## cookie-parser

`cookie-parser` is Express middleware used to read cookies from incoming requests.

Usage in `server.js`:

```js
import cookieParser from "cookie-parser";

app.use(cookieParser());
```

After this, cookies can be accessed using:

```js
req.cookies
```

---

## User Model for Authentication

For authentication, the user model contains:

```txt
name
email
password
role
```

Example:

```js
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      required: true,
      trim: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
```

Important points:

```txt
unique: true     → prevents duplicate email
lowercase: true  → saves email in lowercase
minlength: 6     → password must have minimum 6 characters
default: "user"  → default role is user
```

---

## Auth Route

File:

```txt
src/routes/authRoutes.js
```

Route:

```js
router.post("/register", registerUser);
```

Mounted in `server.js`:

```js
app.use("/api/auth", authRoutes);
```

Final API:

```txt
POST /api/auth/register
```

---

## Register Controller Flow

File:

```txt
src/controllers/authController.js
```

### Read request body

```js
const { name, email, password } = req.body;
```

### Validate required fields

```js
if (!name || !email || !password || !name.trim() || !email.trim()) {
  res.status(400);
  throw new Error("Name, email and password are required");
}
```

### Check duplicate email

```js
const existingUser = await User.findOne({ email });

if (existingUser) {
  res.status(409);
  throw new Error("User already exists with this email");
}
```

`409 Conflict` is used because the email already exists.

### Hash password

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

Meaning:

```txt
Plain password
↓
bcrypt hash
↓
Unreadable password string
```

`10` means salt rounds.

### Save user

```js
const user = await User.create({
  name,
  email,
  password: hashedPassword,
});
```

### Send response without password

```js
res.status(201).json({
  message: "User registered successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
```

Password should not be sent in API response.

---

## Why Password Hashing is Required

Password should never be stored directly in MongoDB.

Wrong:

```json
{
  "email": "lavesh@test.com",
  "password": "123456"
}
```

Correct:

```json
{
  "email": "lavesh@test.com",
  "password": "$2a$10$hashedPasswordValue"
}
```

Reason:

```txt
If database is leaked, plain passwords are directly visible.
Hashed passwords are not readable as original passwords.
```

---

## Register API Responses

### Success

Status:

```txt
201 Created
```

Response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "Lavesh",
    "email": "lavesh@test.com",
    "role": "user"
  }
}
```

### Missing required fields

Status:

```txt
400 Bad Request
```

Response:

```json
{
  "message": "Name, email and password are required"
}
```

### Duplicate email

Status:

```txt
409 Conflict
```

Response:

```json
{
  "message": "User already exists with this email"
}
```

## Login API

Login means verifying an existing user using email and password.

API:

```txt
POST /api/auth/login
```

Request body:

```json
{
  "email": "lavesh@test.com",
  "password": "123456"
}
```

Login flow:

```txt
Read email and password from req.body
↓
Validate required fields
↓
Find user by email
↓
Compare plain password with hashed password
↓
Send login response
```

---

## Login Route

File:

```txt
src/routes/authRoutes.js
```

Route:

```js
router.post("/login", loginUser);
```

Final API:

```txt
POST /api/auth/login
```

---

## Finding User by Email

During login, user is searched by email.

```js
const user = await User.findOne({ email });
```

If user is not found:

```js
res.status(401);
throw new Error("Invalid email or password");
```

`401 Unauthorized` is used because login credentials are invalid.

A common message is used:

```txt
Invalid email or password
```

Reason:

```txt
Do not reveal whether email is registered or password is wrong.
```

---

## Password Comparison

Password stored in MongoDB is hashed.

Example:

```txt
$2a$10$hashedPasswordValue
```

User enters plain password during login:

```txt
123456
```

Do not compare directly:

```js
password === user.password
```

This is wrong because one value is plain text and the other is hashed.

Use bcrypt comparison:

```js
const isPasswordMatch = await bcrypt.compare(password, user.password);
```

If password does not match:

```js
res.status(401);
throw new Error("Invalid email or password");
```

---

## Login Success Response

After successful login:

```js
res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
```

Password should not be sent in the API response.

---

## Login API Responses

### Success

Status:

```txt
200 OK
```

Response:

```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "Lavesh",
    "email": "lavesh@test.com",
    "role": "user"
  }
}
```

### Missing email or password

Status:

```txt
400 Bad Request
```

Response:

```json
{
  "message": "Email and password are required"
}
```

### Invalid email or password

Status:

```txt
401 Unauthorized
```

Response:

```json
{
  "message": "Invalid email or password"
}
```
## JWT Access Token

JWT stands for JSON Web Token.

After login is successful, the backend generates an access token.

The frontend uses this token to call protected APIs.

Example protected API request:

```txt
GET /api/auth/profile
Authorization: Bearer access_token
```

---

## JWT Environment Variables

JWT secret and expiry time are stored in `.env`.

```env
JWT_ACCESS_SECRET=my_access_secret_key
JWT_ACCESS_EXPIRES_IN=15m
```

`.env.example` should contain sample values:

```env
JWT_ACCESS_SECRET=your_access_secret_key
JWT_ACCESS_EXPIRES_IN=15m
```

Meaning:

```txt
JWT_ACCESS_SECRET      → secret key used to sign and verify token
JWT_ACCESS_EXPIRES_IN  → token expiry time
```

---

## Token Utility

File:

```txt
src/utils/generateTokens.js
```

Code:

```js
import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    }
  );
};
```

---

## jwt.sign()

`jwt.sign()` creates a signed JWT token.

It uses three main parts:

```txt
payload
secret
options
```

### Payload

```js
{
  id: user._id,
  role: user.role,
}
```

Payload contains small user identity data.

Do not store sensitive data like password inside JWT payload.

### Secret

```js
process.env.JWT_ACCESS_SECRET
```

Secret is used to sign the token.

The same secret is used later to verify the token.

### Options

```js
{
  expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
}
```

Options define token settings like expiry time.

---

## Login Response with Access Token

After password comparison succeeds, generate access token:

```js
const accessToken = generateAccessToken(user);
```

Return token in login response:

```js
res.status(200).json({
  message: "Login successful",
  accessToken,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
```

Example response:

```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Lavesh",
    "email": "lavesh@test.com",
    "role": "user"
  }
}
```

---

## Access Token Usage

Access token is sent in request headers for protected APIs.

```txt
Authorization: Bearer access_token
```

## Protected Route and Auth Middleware

A protected route is an API that only logged-in users can access.

Example:

```txt
GET /api/auth/profile
```

The frontend sends access token in the request header:

```txt
Authorization: Bearer access_token
```

---

## Auth Middleware

Auth middleware runs before the protected controller.

Route example:

```js
router.get("/profile", protect, getProfile);
```

Flow:

```txt
Request
↓
protect middleware
↓
getProfile controller
```

If token is valid, request can continue.

If token is missing or invalid, request is rejected.

---

## Reading Authorization Header

Token is received from request headers:

```js
const authHeader = req.headers.authorization;
```

Expected format:

```txt
Bearer access_token
```

---

## Checking Bearer Token Format

```js
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  res.status(401);
  throw new Error("Not authorized, token missing");
}
```

Meaning:

```txt
No Authorization header → 401 Unauthorized
Wrong token format      → 401 Unauthorized
```

Correct format:

```txt
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Extracting Token

```js
const token = authHeader.split(" ")[1];
```

Example:

```txt
Bearer abc123
```

After split:

```js
["Bearer", "abc123"]
```

Extracted token:

```txt
abc123
```

---

## Verifying JWT Token

```js
const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
```

This verifies:

```txt
Token is valid
Token is not expired
Token was signed with correct secret
```

Decoded payload example:

```json
{
  "id": "user_id",
  "role": "user",
  "iat": 1781160000,
  "exp": 1781160900
}
```

Meaning:

```txt
id   → user id from token
role → user role from token
iat  → issued at time
exp  → expiry time
```

---

## Protected Route Test Cases

### Missing token

Response:

```json
{
  "message": "Not authorized, token missing"
}
```

Status:

```txt
401 Unauthorized
```

### Wrong token

Response example:

```json
{
  "message": "invalid token"
}
```

### Valid token

Response includes decoded payload:

```json
{
  "message": "Token verified successfully",
  "decoded": {
    "id": "...",
    "role": "user",
    "iat": "...",
    "exp": "..."
  }
}
```

## Handling JWT Errors

JWT verification can fail when the token is invalid or expired.

JWT verification happens in auth middleware:

```js
const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
```

If the token is wrong, `jsonwebtoken` throws:

```txt
JsonWebTokenError
```

If the token is expired, it throws:

```txt
TokenExpiredError
```

These errors can be handled in `errorMiddleware.js`.

```js
if (error.name === "JsonWebTokenError") {
  statusCode = 401;
  message = "Invalid token";
}

if (error.name === "TokenExpiredError") {
  statusCode = 401;
  message = "Token expired";
}
```

Reason:

```txt
Invalid token → 401 Unauthorized
Expired token → 401 Unauthorized
```

Example invalid token response:

```json
{
  "message": "Invalid token"
}
```

## Attaching Logged-in User to req.user

After JWT token verification, the auth middleware can find the logged-in user from MongoDB.

```js
const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
```

`decoded` contains data from the access token payload.

Example:

```json
{
  "id": "user_id",
  "role": "user",
  "iat": 1781160000,
  "exp": 1781160900
}
```

The user is then fetched from MongoDB:

```js
const user = await User.findById(decoded.id).select("-password");
```

`select("-password")` means:

```txt
Return user data without password field.
```

Then the user is attached to the request object:

```js
req.user = user;
```

After this, any protected controller can access the logged-in user using:

```js
req.user
```

---

## Protected Profile API

API:

```txt
GET /api/auth/profile
```

Route:

```js
router.get("/profile", protect, getProfile);
```

Flow:

```txt
Request
↓
protect middleware
↓
verify access token
↓
find user from MongoDB
↓
attach user to req.user
↓
getProfile controller
↓
return profile
```

Controller:

```js
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
```

Request header:

```txt
Authorization: Bearer access_token
```

Success response:

```json
{
  "user": {
    "_id": "...",
    "name": "Lavesh",
    "email": "lavesh@test.com",
    "role": "user",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  }
}
```

Password should not be returned in the response.

## Refresh Token

A refresh token is a longer-lived token used to generate a new access token.

Access token expires quickly.

Example:

```txt
JWT_ACCESS_EXPIRES_IN=15m
```

After access token expires, user should not login again every time.

Refresh token solves this problem.

Flow:

```txt
Access token expired
↓
Frontend calls refresh-token API
↓
Backend verifies refresh token
↓
Backend returns new access token
```

---

## Access Token vs Refresh Token

```txt
Access Token
↓
Short life
Used to access protected APIs
Sent in Authorization header
```

```txt
Refresh Token
↓
Longer life
Used to generate new access token
Stored in httpOnly cookie
```

---

## Refresh Token Environment Variables

```env
JWT_REFRESH_SECRET=my_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d
```

`.env.example`:

```env
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d
```

Meaning:

```txt
JWT_REFRESH_SECRET      → secret key used to sign and verify refresh token
JWT_REFRESH_EXPIRES_IN  → refresh token expiry time
```

---

## Generate Refresh Token

File:

```txt
src/utils/generateTokens.js
```

```js
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};
```

Refresh token payload contains only user id because it is only used to create a new access token.

---

## Store Refresh Token in httpOnly Cookie

During login, refresh token is stored in an httpOnly cookie.

```js
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

Meaning:

```txt
httpOnly: true   → frontend JavaScript cannot directly read cookie
secure: false    → allowed on local HTTP development
sameSite: strict → restricts cross-site cookie sending
maxAge           → cookie expiry time in milliseconds
```

In production with HTTPS:

```js
secure: true
```

Login response returns only access token in body.

Refresh token is not returned in response body.

---

## Refresh Token API

API:

```txt
POST /api/auth/refresh-token
```

Route:

```js
router.post("/refresh-token", refreshAccessToken);
```

Flow:

```txt
Read refreshToken from req.cookies
↓
If missing, return 401
↓
Verify refresh token using JWT_REFRESH_SECRET
↓
Find user from MongoDB
↓
Generate new access token
↓
Return new access token
```

Controller logic:

```js
const { refreshToken } = req.cookies;

if (!refreshToken) {
  res.status(401);
  throw new Error("Refresh token missing");
}

const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

const user = await User.findById(decoded.id);

if (!user) {
  res.status(401);
  throw new Error("Invalid refresh token");
}

const accessToken = generateAccessToken(user);

res.status(200).json({
  accessToken,
});
```

---

## Refresh Token API Responses

### Success

Status:

```txt
200 OK
```

Response:

```json
{
  "accessToken": "new_access_token_here"
}
```

### Missing refresh token

Status:

```txt
401 Unauthorized
```

Response:

```json
{
  "message": "Refresh token missing"
}
```

### Invalid refresh token

Status:

```txt
401 Unauthorized
```

Response:

```json
{
  "message": "Invalid token"
}
```
## Logout API

Logout is used to remove the refresh token cookie.

During login, refresh token is stored in an httpOnly cookie.

During logout, that cookie is cleared.

Flow:

```txt
User logs out
↓
Backend clears refreshToken cookie
↓
User cannot refresh access token anymore
```

---

## Logout Route

API:

```txt
POST /api/auth/logout
```

Route:

```js
router.post("/logout", logoutUser);
```

---

## Logout Controller

```js
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Logout successful",
  });
});
```

---

## clearCookie()

```js
res.clearCookie("refreshToken");
```

This clears the refresh token cookie from the client.

Cookie options should match the cookie options used while setting the cookie.

```js
{
  httpOnly: true,
  secure: false,
  sameSite: "strict",
}
```

For local development:

```txt
secure: false
```

For production with HTTPS:

```txt
secure: true
```

---

## Logout Test Flow

```txt
POST /api/auth/login
↓
refreshToken cookie is created
```

```txt
POST /api/auth/logout
↓
refreshToken cookie is cleared
```

```txt
POST /api/auth/refresh-token
↓
Refresh token missing
```

Expected logout response:

```json
{
  "message": "Logout successful"
}
```

Expected refresh-token response after logout:

```json
{
  "message": "Refresh token missing"
}
```

### Final logout understanding:

```txt

Backend responsibility
↓
Clear refreshToken cookie


Frontend responsibility
↓
Remove accessToken
Clear user state
Redirect to login

```

## Protecting Existing APIs

Existing APIs can be protected using auth middleware.

The `protect` middleware checks whether the request has a valid access token.

Access token is sent in the request header:

```txt
Authorization: Bearer access_token
```

---

## Protecting Task APIs

File:

```txt
src/routes/taskRoutes.js
```

Import:

```js
import { protect } from "../middleware/authMiddleware.js";
```

Protected task routes:

```js
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
```

Flow:

```txt
Request
↓
protect middleware
↓
verify access token
↓
attach logged-in user to req.user
↓
task controller
```

If token is missing or invalid, task controller will not run.

---

## Protecting User APIs

File:

```txt
src/routes/userRoutes.js
```

Import:

```js
import { protect } from "../middleware/authMiddleware.js";
```

Protected user routes:

```js
router.get("/", protect, getUsers);
router.post("/", protect, createUser);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
```

This means only logged-in users with a valid access token can access user APIs.

---

## Protected API Test

### Without token

Request:

```txt
GET /api/tasks
```

Response:

```json
{
  "message": "Not authorized, token missing"
}
```

Status:

```txt
401 Unauthorized
```

### With valid token

Request:

```txt
GET /api/tasks
Authorization: Bearer access_token
```

Response:

```txt
200 OK
```

Task data is returned.

---

## Next Authorization Improvement

Currently `protect` only checks if the user is logged in.

Later, role-based authorization can be added.

Example:

```js
router.get("/", protect, authorizeRoles("admin"), getUsers);
```

Meaning:

```txt
protect → checks login
authorizeRoles("admin") → checks role permission
```
## Role-Based Authorization

Authentication checks whether the user is logged in.

Authorization checks whether the logged-in user has permission to access an API.

```txt
Authentication → Are you logged in?
Authorization  → Are you allowed?
```

---

## authorizeRoles Middleware

File:

```txt
src/middleware/authMiddleware.js
```

```js
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You are not allowed to access this resource");
    }

    next();
  };
};
```

---

## How authorizeRoles Works

```js
authorizeRoles("admin")
```

means only users with role `admin` can access the API.

```js
authorizeRoles("admin", "manager")
```

means users with role `admin` or `manager` can access the API.

This middleware checks:

```js
req.user.role
```

`req.user` is created by the `protect` middleware.

So `authorizeRoles` must be used after `protect`.

Correct:

```js
router.get("/", protect, authorizeRoles("admin"), getUsers);
```

Wrong:

```js
router.get("/", authorizeRoles("admin"), protect, getUsers);
```

---

## Status Codes

```txt
401 Unauthorized
→ User is not logged in or token is missing/invalid

403 Forbidden
→ User is logged in but does not have permission
```

---

## Admin-Only User Routes

User management routes can be made admin-only.

```js
router.get("/", protect, authorizeRoles("admin"), getUsers);
router.post("/", protect, authorizeRoles("admin"), createUser);
router.get("/:id", protect, authorizeRoles("admin"), getUserById);
router.put("/:id", protect, authorizeRoles("admin"), updateUser);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);
```

Flow:

```txt
Request
↓
protect
↓
verify access token
↓
attach logged-in user to req.user
↓
authorizeRoles("admin")
↓
check req.user.role
↓
user controller
```

---

## Token Role Note

Access token payload contains user role.

Example:

```js
{
  id: user._id,
  role: user.role
}
```

If user role is changed in MongoDB, the user must login again to get a new token with the updated role.

Admin-only authorization is applied to user management routes.


## Hiding Password Field from API Responses

Even hashed passwords should not be returned in API responses.

By default, Mongoose returns all fields from a document.

To hide the password field by default, use `select: false` in the schema.

```js
password: {
  type: String,
  required: true,
  minlength: 6,
  select: false,
}
```

This prevents password from being returned in normal queries like:

```js
User.find();
User.findById(id);
```

---

## Accessing Password Only During Login

During login, password is required internally for bcrypt comparison.

Because password is hidden by default, explicitly include it only in login query:

```js
const user = await User.findOne({ email }).select("+password");
```

Then compare password:

```js
const isPasswordMatch = await bcrypt.compare(password, user.password);
```

Password should still not be sent in the response.

---

## Why This is Important

```txt
Hashed password is sensitive data.
API responses should not expose password field.
Password should only be used internally during login.
```
## User-Specific Tasks

Tasks should belong to the logged-in user.

This prevents one user from seeing, updating, or deleting another user's tasks.

---

## Task Model User Reference

Each task stores the user id of the owner.

```js
user: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "User",
}
```

Example task document:

```json
{
  "_id": "task_id",
  "title": "Learn MongoDB",
  "status": "pending",
  "user": "logged_in_user_id"
}
```

---

## Create Task for Logged-In User

When a user creates a task, save the logged-in user's id.

```js
const task = await Task.create({
  title,
  status,
  user: req.user._id,
});
```

---

## Get Only Logged-In User's Tasks

```js
const tasks = await Task.find({
  user: req.user._id,
});
```

This means:

```txt
GET /api/tasks
→ returns only current user's tasks
```

---

## Protect Single Task Access

For single task, update, and delete APIs, check both task id and user id.

```js
const task = await Task.findOne({
  _id: req.params.id,
  user: req.user._id,
});
```

```js
const task = await Task.findOneAndUpdate(
  {
    _id: req.params.id,
    user: req.user._id,
  },
  {
    title,
    status,
  },
  {
    returnDocument: "after",
    runValidators: true,
  }
);
```

```js
const task = await Task.findOneAndDelete({
  _id: req.params.id,
  user: req.user._id,
});
```

---

## Why Return 404 Instead of 403?

If another user tries to access a task they do not own, return:

```txt
404 Task not found
```

This is safer because it does not reveal whether another user's task exists.

---

## Final Task Authorization Flow

```txt
Request
↓
protect middleware
↓
verify access token
↓
attach logged-in user to req.user
↓
task controller
↓
query task with user: req.user._id
↓
return only current user's task data
```

## Backend Support for Frontend Auth

The backend provides authentication APIs for the React frontend.

## Auth APIs

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
POST /api/auth/refresh-token
POST /api/auth/logout
```

---

## CORS Setup for Frontend

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:5000
```

To allow frontend requests and cookies, CORS is configured with credentials.

```js
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```

`credentials: true` is required because the backend stores the refresh token in an httpOnly cookie.

---

## Register API

Public registration creates a normal user.

Frontend sends:

```json
{
  "name": "User Name",
  "email": "user@test.com",
  "password": "123456"
}
```

Frontend does not send `role`.

Role is handled by backend using the schema default:

```js
role: {
  type: String,
  required: true,
  trim: true,
  default: "user",
}
```

This prevents users from registering themselves as admin.

---

## Login API Response

After successful login, backend returns user data and access token.

```js
res.status(200).json({
  message: "Login successful",
  accessToken,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
```

Frontend stores this response in localStorage.

Expected frontend auth structure:

```json
{
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@test.com",
    "role": "user"
  },
  "accessToken": "jwt_access_token"
}
```

---

## Protected Profile API

Profile route is protected using `protect` middleware.

```js
router.get("/profile", protect, getProfile);
```

Frontend must send access token in the Authorization header.

```txt
Authorization: Bearer accessToken
```

Backend flow:

```txt
Request
↓
protect middleware
↓
verify access token
↓
find logged-in user
↓
attach user to req.user
↓
return profile data
```

---

## Logout API

Logout clears the refresh token cookie.

```js
res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
});
```

Frontend also removes auth data from localStorage.

---

## Important Security Notes

```txt
Register API should not accept admin role from frontend.
Refresh token is stored in httpOnly cookie.
Access token is sent in Authorization header.
Password is hidden from API responses using select: false.
Login uses .select("+password") only for bcrypt comparison.
```

## Backend Validation Middleware

Validation middleware is used to validate incoming request data before it reaches the controller.

This keeps controllers clean and focused on business logic.

---

## Why Validation Middleware?

Before validation middleware, controllers were handling multiple responsibilities:

```txt
Validate request data
Handle database logic
Send response
```

Now validation is handled separately:

```txt
Request
↓
Validation Middleware
↓
Controller
↓
Database
↓
Response
```

This is a cleaner and more maintainable backend structure.

---

## Validation Middleware File

Validation middleware is created inside:

```txt
backend/src/middleware/validationMiddleware.js
```

This file contains reusable validation functions for different APIs.

---

## Task Validation

Task APIs use `validateTaskBody`.

Used in:

```js
router.post("/", protect, validateTaskBody, createTask);
router.put("/:id", protect, validateTaskBody, updateTask);
```

Validation checks:

```txt
Task title is required
Task status is required
Spaces-only title is not allowed
Spaces-only status is not allowed
```

Example:

```js
export const validateTaskBody = (req, res, next) => {
  const { title, status } = req.body;

  if (!title || !title.trim()) {
    res.status(400);
    throw new Error("Task title is required");
  }

  if (!status || !status.trim()) {
    res.status(400);
    throw new Error("Task status is required");
  }

  next();
};
```

---

## Auth Validation

Auth APIs use separate validation middleware for register and login.

Used in:

```js
router.post("/register", validateRegisterBody, registerUser);
router.post("/login", validateLoginBody, loginUser);
```

Register validation checks:

```txt
Name is required
Email is required
Password is required
Password must be at least 6 characters
```

Login validation checks:

```txt
Email is required
Password is required
```

---

## Final Route Flow

Task create flow:

```txt
POST /api/tasks
↓
protect
↓
validateTaskBody
↓
createTask
```

Task update flow:

```txt
PUT /api/tasks/:id
↓
protect
↓
validateTaskBody
↓
updateTask
```

Register flow:

```txt
POST /api/auth/register
↓
validateRegisterBody
↓
registerUser
```

Login flow:

```txt
POST /api/auth/login
↓
validateLoginBody
↓
loginUser
```

---

## Benefit

Using validation middleware improves the backend by:

```txt
Keeping controllers clean
Avoiding duplicate validation code
Making validation reusable
Improving route readability
Following better backend structure
```


## Request Sanitization and Allowed Values

The task validation middleware now validates and sanitizes task data before it reaches the controller.

Allowed task status values:

```txt
pending
in-progress
completed

Invalid values like abc, done123, or testing are rejected with:

{
  "message": "Invalid task status"
}

The middleware also trims extra spaces before saving data.

Example request:

{
  "title": "  Learn backend sanitization  ",
  "status": " pending "
}

Saved result:

{
  "title": "Learn backend sanitization",
  "status": "pending"
}

Validation checks whether data is correct.

Sanitization cleans the data before saving.

```
## Mongoose Schema Validation

Mongoose schema validation protects the database model.

Task status now uses an enum:

```js
status: {
  type: String,
  required: true,
  enum: ["pending", "in-progress", "completed"],
  trim: true,
}

This means only these task statuses are allowed:

pending
in-progress
completed

The task model also uses trim: true for title and status.

This gives an extra safety layer:

Frontend validation
↓
Backend middleware validation
↓
Mongoose schema validation
↓
MongoDB

Middleware validation protects the API request.

Mongoose schema validation protects the database model.

```

## Backend Service Layer

A service layer was added to separate database logic from controllers.

Before service layer:

```txt
Route
↓
Middleware
↓
Controller
↓
Mongoose Model
```

After service layer:

```txt
Route
↓
Middleware
↓
Controller
↓
Service
↓
Mongoose Model
↓
MongoDB
```

---

## Why Service Layer?

Controllers should mainly handle:

```txt
Request data
Response
Status code
```

Services should handle:

```txt
Database logic
Business logic
Reusable operations
```

This keeps controllers cleaner and makes backend code easier to maintain.

---

## Task Service

Task database logic was moved to:

```txt
backend/src/services/taskService.js
```

The task service contains reusable functions:

```js
findTasksByUser(userId)
createTaskForUser(taskData, userId)
findTaskByIdAndUser(taskId, userId)
updateTaskByIdAndUser(taskId, userId, taskData)
deleteTaskByIdAndUser(taskId, userId)
```

---

## Task Controller After Service Layer

The task controller now calls service functions instead of directly using the Mongoose model.

Example:

```js
const tasks = await findTasksByUser(req.user._id);
```

Instead of:

```js
const tasks = await Task.find({ user: req.user._id });
```

---

## Benefit

Service layer improves the backend by:

```txt
Keeping controllers clean
Moving database logic to one place
Making logic reusable
Improving project structure
Following industry-style backend architecture
```

The API behavior remains the same, but the code structure is cleaner.

## Auth Service Layer

An auth service layer was added to separate auth-related database logic from the auth controller.

Before auth service layer:

```txt
Route
↓
Middleware
↓
Auth Controller
↓
User Model
```

After auth service layer:

```txt
Route
↓
Middleware
↓
Auth Controller
↓
Auth Service
↓
User Model
↓
MongoDB
```

---

## Auth Service File

Auth service logic is created inside:

```txt
backend/src/services/authService.js
```

This file contains reusable auth-related database functions.

---

## Auth Service Functions

```js
findUserByEmail(email)
findUserByEmailWithPassword(email)
createAuthUser(userData)
findUserById(userId)
```

---

## Why `findUserByEmailWithPassword`?

In the user model, password is hidden by default using:

```js
select: false
```

So during login, password must be selected manually:

```js
User.findOne({ email }).select("+password")
```

This logic is now moved into the auth service:

```js
findUserByEmailWithPassword(email)
```

This keeps the controller cleaner and makes the purpose clear.

---

## Auth Controller After Service Layer

The auth controller now calls service functions instead of directly using the User model.

Example:

```js
const user = await findUserByEmailWithPassword(email);
```

Instead of:

```js
const user = await User.findOne({ email }).select("+password");
```

---

## Benefit

Auth service layer improves the backend by:

```txt
Keeping auth controller clean
Moving database logic to one place
Making auth logic reusable
Improving project structure
Following industry-style backend architecture
```

The API behavior remains the same, but the code structure is cleaner.
## User Service Layer

A user service layer was added to separate user-related database logic from the user controller.

Before user service layer:

```txt
Route
↓
Middleware
↓
User Controller
↓
User Model
↓
MongoDB
```

After user service layer:

```txt
Route
↓
Middleware
↓
User Controller
↓
User Service
↓
User Model
↓
MongoDB
```

---

## User Service File

User service logic is created inside:

```txt
backend/src/services/userService.js
```

This file contains reusable user-related database functions.

---

## User Service Functions

```js
findAllUsers()
createNewUser(userData)
findUserById(userId)
updateUserById(userId, userData)
deleteUserById(userId)
findUserByEmail(email)
```

---

## Why User Service Layer?

The user controller should focus on:

```txt
Reading request data
Sending response
Setting status codes
```

The user service should focus on:

```txt
Database queries
User create logic
User update logic
User delete logic
Reusable database operations
```

This keeps the controller clean and makes the backend easier to maintain.

---

## Password Safety in User Create API

The admin user creation API accepts:

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "123456",
  "role": "user"
}
```

Before saving the user, the password is hashed using bcrypt:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

So MongoDB stores a hashed password, not the plain password.

Example stored password:

```txt
$2b$10$....
```

Plain password like this should never be stored:

```txt
123456
```

---

## Password Removed From Response

After creating a user, the password is removed before sending the response.

```js
const userResponse = user.toObject();
delete userResponse.password;
```

So the API response does not expose the password.

Example safe response:

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "user_id",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "user"
  }
}
```

---

## Final User API Flow

```txt
Request
↓
Admin route protection
↓
User controller
↓
User service
↓
User model
↓
MongoDB
↓
Safe response without password
```

---

## Benefit

User service layer improves the backend by:

```txt
Keeping user controller clean
Moving database logic to one place
Making user logic reusable
Improving project structure
Protecting password data
Following industry-style backend architecture
```

The API behavior remains the same, but the code structure is cleaner and safer.

## User Validation Middleware

User create and update validation was moved from `userController.js` to validation middleware.

Used in:

```js
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateCreateUserBody,
  createUser
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateUpdateUserBody,
  updateUser
);
```
## User Validation Middleware

User create and update validation was moved from `userController.js` to validation middleware.

Used in:

```js
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateCreateUserBody,
  createUser
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateUpdateUserBody,
  updateUser
);
```

## Centralized Error Response Format

The backend uses centralized error middleware to send consistent error responses.

All errors now return this format:

```json
{
  "success": false,
  "message": "Error message here"
}

```

## Centralized API Response Format

The backend now uses a consistent API response format for both success and error responses.

This makes the API easier to understand and easier to handle on the frontend.

---

## Success Response Format

All successful responses now follow this structure:

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

If no data is needed, only `success` and `message` are returned.

Example:

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Error Response Format

All errors are handled by centralized error middleware.

Error responses follow this structure:

```json
{
  "success": false,
  "message": "Error message"
}
```

Example:

```json
{
  "success": false,
  "message": "Email is required"
}
```

---

## Utility Used

A reusable response utility was added:

```txt
backend/src/utils/sendResponse.js
```

This utility is used to send success responses from controllers.

---

## Controllers Updated

The following controllers now use the centralized success response format:

```txt
authController.js
taskController.js
userController.js
```

---

## Frontend Impact

Because the backend response structure changed, the frontend was updated to read data from the new response format.

Before:

```txt
response.user
response.accessToken
response.task
```

Now:

```txt
response.data.user
response.data.accessToken
response.data
```

---

## Benefits

This improves the project by:

```txt
Keeping API responses consistent
Reducing repeated response code
Making frontend handling easier
Improving controller readability
Following cleaner backend API structure
```
## Task Pagination & Filtering

Tasks API now supports filtering and pagination.

### Query Parameters

- `status` → filter tasks by status
  - pending
  - in-progress
  - completed

- `page` → page number (default: 1)
- `limit` → number of records per page (default: 10)

---

### Example Requests

```txt
GET /api/tasks
GET /api/tasks?status=completed
GET /api/tasks?page=1&limit=2
GET /api/tasks?status=pending&page=2&limit=5
```

## Task Advanced Query System

The Task API now supports advanced query features:

### 🔍 Features

- Filtering by status
- Searching by title
- Pagination (page & limit)
- Sorting (date & alphabetical)

---

## Query Parameters

### Status Filter
```txt
## Day 11: File Upload with Express and Multer

### Topics Covered

* What is `multipart/form-data`
* Why `express.json()` cannot handle file uploads
* What is Multer
* Single file upload using `upload.single()`
* Storing uploaded files in the `uploads/` folder
* File type validation using `file.mimetype`
* File size validation using Multer `limits`
* Handling Multer errors in global error middleware
* Serving uploaded files publicly using `express.static`
* Returning uploaded file URL in API response
* Saving profile image URL in MongoDB

### APIs Added

#### Upload Single File

```txt
POST /api/uploads/single
```

Body:

```txt
form-data
key: file
type: File
```

Response:

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileName": "uploaded-file-name.png",
    "fileUrl": "http://localhost:5000/uploads/uploaded-file-name.png"
  }
}
```

#### Update Logged-in User Profile Image

```txt
PATCH /api/users/profile-image
```

Headers:

```txt
Authorization: Bearer <accessToken>
```

Body:

```txt
form-data
key: file
type: File
```

Response:

```json
{
  "success": true,
  "message": "Profile image updated successfully",
  "data": {
    "user": {
      "_id": "user-id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user",
      "profileImage": "http://localhost:5000/uploads/uploaded-file-name.png"
    }
  }
}
```

### Important Learning

`cb` in Multer means callback. Multer uses it to know what to do next.

Examples:

```js
cb(null, "uploads/");
```

Means save file in the `uploads/` folder.

```js
cb(null, fileName);
```

Means use this generated file name.

```js
cb(null, true);
```

Means accept the uploaded file.

```js
cb(new Error("Only image files are allowed"), false);
```

Means reject the uploaded file.

### Final Flow

```txt
Client sends form-data file
↓
upload.single("file")
↓
Multer validates file type and size
↓
File is saved in uploads folder
↓
Controller creates public file URL
↓
MongoDB user document is updated with profileImage URL
```
# Day 12: Cloud Image Upload with Cloudinary

### Topics Covered

- Why local file upload is not enough for production
- What is Cloudinary
- Cloudinary package setup
- Cloudinary credentials using `.env`
- Cloudinary configuration file
- Upload image to Cloudinary using Express
- Return Cloudinary image URL in API response
- Save Cloudinary image URL in MongoDB user profile
- Delete local temporary file after Cloudinary upload

---

### Package Installed

```bash
npm install cloudinary

Environment Variables
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Cloudinary Config

File:

src/config/cloudinary.js
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
APIs Added / Updated
Upload Single File to Cloudinary
POST /api/uploads/cloudinary/single

Body:

form-data
key: file
type: File

Response:

{
  "success": true,
  "message": "File uploaded to Cloudinary successfully",
  "data": {
    "fileName": "uploaded-file-name.png",
    "fileUrl": "https://res.cloudinary.com/...",
    "publicId": "node-react-learning/..."
  }
}
Update Logged-in User Profile Image with Cloudinary URL
PATCH /api/users/profile-image

Headers:

Authorization: Bearer <accessToken>

Body:

form-data
key: file
type: File

Response:

{
  "success": true,
  "message": "Profile image updated successfully",
  "data": {
    "user": {
      "_id": "user-id",
      "name": "admin",
      "email": "admin@test.com",
      "role": "admin",
      "profileImage": "https://res.cloudinary.com/..."
    }
  }
}
Final Flow
Frontend sends image as form-data
↓
Multer receives file
↓
File is temporarily saved locally
↓
Cloudinary uploads image
↓
Local temporary file is deleted
↓
Cloudinary secure_url is saved in MongoDB
↓
Frontend uses profileImage URL in img tag
Frontend Usage
<img src={user.profileImage} alt="Profile" />
Important Learning

MongoDB does not store the actual image file.

Actual image file
→ stored in Cloudinary

Image URL
→ stored in MongoDB

```

### Profile Image Update with Cloudinary Public ID

To properly manage profile images, we store both the Cloudinary image URL and Cloudinary public ID in MongoDB.

```js
profileImage: {
  type: String,
  default: "",
},

profileImagePublicId: {
  type: String,
  default: "",
},

Why store profileImage?

profileImage is used by the frontend to display the image.

<img src={user.profileImage} alt="Profile" />
Why store profileImagePublicId?

Cloudinary deletes images using public_id, not the image URL.

await cloudinary.uploader.destroy(user.profileImagePublicId);
Final Profile Image Update Flow
User uploads new profile image
↓
Multer receives file
↓
Cloudinary uploads new image
↓
Local temporary file is deleted
↓
Old Cloudinary image is deleted using profileImagePublicId
↓
New secure_url is saved in profileImage
↓
New public_id is saved in profileImagePublicId
Updated User Response
{
  "success": true,
  "message": "Profile image updated successfully",
  "data": {
    "user": {
      "_id": "user-id",
      "name": "admin",
      "email": "admin@test.com",
      "role": "admin",
      "profileImage": "https://res.cloudinary.com/...",
      "profileImagePublicId": "node-react-learning/profile-images/..."
    }
  }
}

```

# Day 13: Email Sending with Node.js using Nodemailer and Ethereal

### Topics Covered

* What is SMTP
* What is Nodemailer
* Why we use Ethereal Email for testing
* Installing Nodemailer
* Creating reusable email service
* Sending test email from backend
* Using SMTP config from `.env`
* Sending welcome email after user registration

---

### Package Installed

```bash
npm install nodemailer
```

---

### Environment Variables

```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_username
SMTP_PASS="your_ethereal_password"
SMTP_FROM=Node Learning App <test@example.com>
```

> `.env` should not be committed to GitHub because it contains SMTP password.

---

### Email Utility

File:

```txt
src/utils/emailService.js
```

The email utility uses Nodemailer to send email using SMTP config from `.env`.

```js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html,
  });

  return nodemailer.getTestMessageUrl(info);
};
```

---

### Test Email API

```txt
POST /api/emails/test
```

This API sends a test email using Ethereal and returns a preview URL.

Example response:

```json
{
  "success": true,
  "message": "Test email sent successfully",
  "data": {
    "previewUrl": "https://ethereal.email/message/..."
  }
}
```

---

### Welcome Email After Register

After user registration, backend sends a welcome email.

Flow:

```txt
User sends register request
↓
Backend validates request body
↓
Password is hashed
↓
User is saved in MongoDB
↓
Welcome email is sent using sendEmail()
↓
Register response is returned
```

Example usage inside register controller:

```js
const previewUrl = await sendEmail({
  to: user.email,
  subject: "Welcome to Node Learning App",
  text: `Hello ${user.name}, welcome to Node Learning App.`,
  html: `
    <h2>Welcome ${user.name}</h2>
    <p>Your account has been created successfully.</p>
    <p>Thank you for joining Node Learning App.</p>
  `,
});

console.log("Welcome email preview:", previewUrl);
```

---

### Important Learning

Ethereal Email does not send real emails to real inboxes.

It gives a preview URL where we can see the email content.

```txt
Backend sends email
↓
Ethereal catches email
↓
Preview URL is returned
↓
We open preview URL and check email
```

---

### Common Error Fixed

Error:

```txt
Invalid login: 535 Authentication failed
```

Reason:

```txt
SMTP username/password was wrong or password had special characters.
```

Fix:

```env
SMTP_PASS="exact_password_here"
```

Use quotes around password when it contains special characters.
### Gmail SMTP Setup

After testing email with Ethereal, we also tested real email sending using Gmail SMTP.

Gmail SMTP is free for learning, but it requires a Google App Password.

Normal Gmail password does not work.

---

### Gmail SMTP Environment Variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourgmail@gmail.com
SMTP_PASS="your_16_character_app_password"
SMTP_FROM=Node Learning App <yourgmail@gmail.com>
```

> `SMTP_PASS` should be the Gmail App Password, not the normal Gmail password.

---

### Gmail SMTP Setup Flow

```txt
Google Account
↓
Enable 2-Step Verification
↓
Create App Password
↓
Add Gmail SMTP values in .env
↓
Restart backend server
↓
Test email API
↓
Check real inbox or spam folder
```

---

### Test Email API

```txt
POST /api/emails/test
```

With Gmail SMTP, the email is sent to a real email inbox.

For testing, update the `to` email in the test email controller to your own email address.

```js
const emailInfo = await sendEmail({
  to: "yourrealemail@gmail.com",
  subject: "Test Email from Node.js",
  text: "Hello, this is a test email from Node.js.",
  html: "<h2>Hello</h2><p>This is a test email from Node.js.</p>",
});
```

---

### Important Difference Between Ethereal and Gmail SMTP

```txt
Ethereal
→ Used only for testing
→ Does not send real email
→ Gives preview URL

Gmail SMTP
→ Sends real email
→ Email can arrive in inbox or spam
→ Does not provide Ethereal preview URL
```

---

### Common Gmail SMTP Notes

* Gmail SMTP may send test emails to the spam folder.
* `SMTP_FROM` email should match `SMTP_USER`.
* `.env` should never be committed to GitHub.
* Gmail App Password should be kept secret.
* Restart backend after changing `.env`.

---

### Final Email Flow

```txt
Backend API is called
↓
Controller calls sendEmail()
↓
sendEmail() reads SMTP config from .env
↓
Nodemailer connects to Gmail SMTP
↓
Email is sent to real inbox
```
# Day 14: Forgot Password and Reset Password Flow

### Topics Covered

- Forgot password API
- Reset password API
- Secure reset token generation using Node.js `crypto`
- Hashing reset token before saving in MongoDB
- Reset token expiry time
- Sending password reset link by email
- Validating reset token
- Hashing new password with bcrypt
- Clearing reset token after password reset

---

### APIs Added

#### Forgot Password

```txt
POST /api/auth/forgot-password

Body:

{
  "email": "admin@test.com"
}

Flow:

User enters email
↓
Backend finds user
↓
Backend creates plain reset token
↓
Backend hashes token using sha256
↓
Hashed token + expiry saved in MongoDB
↓
Plain token is sent in email reset link
Reset Password
POST /api/auth/reset-password/:token

Body:

{
  "password": "newpass123"
}

Flow:

User opens reset link
↓
Frontend sends token + new password
↓
Backend hashes URL token
↓
Backend finds user by hashed token
↓
Backend checks token expiry
↓
New password is hashed with bcrypt
↓
Password is updated
↓
Reset token fields are cleared
Important Learning
Password
→ hashed using bcrypt

Reset token
→ generated using crypto
→ hashed using sha256 before saving

MongoDB stores only the hashed reset token, not the plain token.

Frontend Flow
Forgot Password Page
↓
User enters email
↓
Call forgot-password API
↓
User receives reset link in email
↓
Reset Password Page reads token from URL
↓
User enters new password
↓
Call reset-password API
↓
Redirect to login page
```

#### Reset Password
```
POST /api/auth/reset-password/:token

Body:

{
  "password": "newpass123"
}

Flow:

User clicks reset link
↓
Frontend sends token + new password
↓
Backend hashes token from URL
↓
Backend finds user by hashed token
↓
Backend checks token expiry
↓
New password is hashed using bcrypt
↓
Password is updated
↓
Reset token fields are cleared
User Model Fields Added
passwordResetToken: {
  type: String,
},

passwordResetExpires: {
  type: Date,
},
Important Learning

For password:

bcrypt
→ used because passwords can be weak
→ slow and secure hashing

For reset token:

crypto sha256
→ used because token is already randomly generated
→ fast hash is enough
Security Notes
Plain reset token is sent only in email link.
Hashed reset token is stored in MongoDB.
Reset link expires after 10 minutes.
After password reset, token fields are cleared.
Same reset link cannot be reused.
```
# Day 15: Mobile OTP Password Reset using Twilio

### Topics Covered

* Why mobile OTP reset is useful
* Twilio SMS setup
* Creating reusable SMS service
* Sending test SMS
* Generating 6-digit OTP
* Hashing OTP before saving in MongoDB
* Saving OTP expiry time
* Sending plain OTP by SMS
* Verifying OTP
* Resetting password after OTP verification

---

### Package Installed

```bash
npm install twilio
```

---

### Environment Variables

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

> `.env` should not be committed because it contains Twilio secrets.

---

### User Model Fields Added

```js
mobile: {
  type: String,
  trim: true,
},

passwordResetOtp: {
  type: String,
},

passwordResetOtpExpires: {
  type: Date,
},

isPasswordResetOtpVerified: {
  type: Boolean,
  default: false,
},
```

---

### SMS Utility

File:

```txt
src/utils/smsService.js
```

```js
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSms = async ({ to, message }) => {
  const sms = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });

  return sms;
};
```

---

### APIs Added

#### Test SMS API

```txt
POST /api/sms/test
```

Body:

```json
{
  "mobile": "+91xxxxxxxxxx"
}
```

This API sends a test SMS using Twilio.

---

#### Forgot Password with OTP

```txt
POST /api/auth/forgot-password-otp
```

Body:

```json
{
  "mobile": "+91xxxxxxxxxx"
}
```

Flow:

```txt
Mobile number received
↓
User found by mobile
↓
6-digit OTP generated
↓
OTP hashed using crypto sha256
↓
Hashed OTP + expiry saved in MongoDB
↓
Plain OTP sent by SMS
```

---

#### Verify Reset OTP

```txt
POST /api/auth/verify-reset-otp
```

Body:

```json
{
  "mobile": "+91xxxxxxxxxx",
  "otp": "123456"
}
```

Flow:

```txt
Mobile + OTP received
↓
User found by mobile
↓
Entered OTP hashed
↓
Compared with saved hashed OTP
↓
Expiry checked
↓
isPasswordResetOtpVerified set to true
```

---

#### Reset Password with OTP

```txt
POST /api/auth/reset-password-otp
```

Body:

```json
{
  "mobile": "+91xxxxxxxxxx",
  "password": "newpass123"
}
```

Flow:

```txt
Mobile + new password received
↓
User found by mobile
↓
OTP verification status checked
↓
New password hashed using bcrypt
↓
Password updated
↓
OTP fields cleared
↓
Login works with new password
```

---

### Important Learning

Plain OTP is sent to the user by SMS.

Hashed OTP is stored in MongoDB.

```txt
Plain OTP
→ sent by SMS

Hashed OTP
→ saved in MongoDB
```

For password hashing:

```txt
bcrypt
→ used for passwords
```

For OTP hashing:

```txt
crypto sha256
→ used because OTP is temporary and system-generated
```

---

### Twilio Trial Note

Twilio trial accounts can send SMS only to verified receiver numbers.

If this error appears:

```txt
Trial accounts cannot send messages to unverified numbers
```

Then verify the receiver mobile number in Twilio dashboard first.

---

### Final Mobile OTP Reset Flow

```txt
User selects mobile OTP reset
↓
User enters mobile number
↓
Backend sends OTP by SMS
↓
User enters OTP
↓
Backend verifies OTP
↓
User enters new password
↓
Backend resets password
```
## Day 16: API Security and Rate Limiting

### Objective

In this section, we added rate limiting to protect public authentication APIs from repeated or abusive requests.

Rate limiting is important for APIs like login, forgot password, and OTP verification because these APIs can be misused for brute-force attacks, email spam, SMS spam, or OTP guessing.

---

### Why Rate Limiting Is Needed

Without rate limiting, anyone can repeatedly call APIs like:

```txt
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/forgot-password-otp
POST /api/auth/verify-reset-otp
```

This can cause security and cost issues.

Examples:

```txt
Login API
→ attacker can try many password combinations

Forgot password email API
→ attacker can spam reset emails

Forgot password OTP API
→ attacker can spam SMS OTP messages

Verify OTP API
→ attacker can try many OTP combinations
```

Rate limiting helps block repeated requests after a safe limit.

---

### Package Installed

```bash
npm install express-rate-limit
```

---

### Middleware Created

File:

```txt
src/middleware/rateLimiterMiddleware.js
```

We created separate limiters for different types of APIs.

```js
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many password reset requests, please try again later",
  },
});

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many OTP attempts, please try again after 5 minutes",
  },
});
```

---

### 1. Login Rate Limiter

```js
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes",
  },
});
```

#### Meaning

```txt
windowMs: 15 * 60 * 1000
→ 15 minutes time window

max: 5
→ only 5 login requests allowed in 15 minutes
```

#### Used On

```txt
POST /api/auth/login
```

#### Purpose

```txt
Protects login API from brute-force password attempts.
```

---

### 2. Forgot Password Rate Limiter

```js
export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many password reset requests, please try again later",
  },
});
```

#### Meaning

```txt
Only 3 password reset requests are allowed in 15 minutes.
```

#### Used On

```txt
POST /api/auth/forgot-password
POST /api/auth/forgot-password-otp
```

#### Purpose

```txt
Protects email reset API from email spam.
Protects OTP reset API from SMS spam.
```

---

### 3. OTP Rate Limiter

```js
export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many OTP attempts, please try again after 5 minutes",
  },
});
```

#### Meaning

```txt
Only 5 OTP verification attempts are allowed in 5 minutes.
```

#### Used On

```txt
POST /api/auth/verify-reset-otp
```

#### Purpose

```txt
Protects OTP verification API from repeated OTP guessing.
```

---

### Routes Updated

File:

```txt
src/routes/authRoutes.js
```

```js
import {
  loginLimiter,
  forgotPasswordLimiter,
  otpLimiter,
} from "../middleware/rateLimiterMiddleware.js";
```

Routes:

```js
router.post("/login", loginLimiter, validateLoginBody, loginUser);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

router.post(
  "/forgot-password-otp",
  forgotPasswordLimiter,
  forgotPasswordOtp
);

router.post("/verify-reset-otp", otpLimiter, verifyResetOtp);
```

---

### Rate Limited APIs

| API                                  | Limiter                 | Limit                   |
| ------------------------------------ | ----------------------- | ----------------------- |
| `POST /api/auth/login`               | `loginLimiter`          | 5 requests / 15 minutes |
| `POST /api/auth/forgot-password`     | `forgotPasswordLimiter` | 3 requests / 15 minutes |
| `POST /api/auth/forgot-password-otp` | `forgotPasswordLimiter` | 3 requests / 15 minutes |
| `POST /api/auth/verify-reset-otp`    | `otpLimiter`            | 5 requests / 5 minutes  |

---

### Expected Error Response

When request limit is crossed, backend returns:

```json
{
  "success": false,
  "message": "Too many requests message here"
}
```

Status code:

```txt
429 Too Many Requests
```

Example login limit response:

```json
{
  "success": false,
  "message": "Too many login attempts, please try again after 15 minutes"
}
```

---

### Final Request Flow

```txt
Client calls protected auth API
↓
Rate limiter middleware checks request count
↓
If request count is within limit
    → request continues to controller
↓
If request count crosses limit
    → backend returns 429 Too Many Requests
```

---

### Important Learning

Rate limiting is one of the basic API security protections.

It helps protect backend from:

```txt
Brute-force login attempts
Forgot password email spam
SMS OTP spam
OTP guessing attacks
```

Different APIs need different limits, so we created separate limiters instead of using one common limiter for all routes.

---

### Day 16 Summary

In Day 16, we added API security using `express-rate-limit`.

We protected important public authentication APIs:

```txt
Login API
Forgot password email API
Forgot password OTP API
Verify OTP API
```

This makes the backend safer and prevents repeated abuse of sensitive APIs.
