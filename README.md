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
# Day 9: Registration and Authentication

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




