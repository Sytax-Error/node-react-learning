# Node.js + Express.js + React Learning Notes

## Purpose

This repo is for learning backend development with **Node.js + Express.js** and connecting it with **React.js** frontend.

```txt
React.js   → Frontend/UI
Node.js    → Runs JavaScript outside browser
Express.js → Framework to create backend APIs
```

---

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