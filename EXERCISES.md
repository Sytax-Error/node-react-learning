# MERN Backend Exercises

This file contains practice questions, quiz results, and practical backend exercises completed during Node.js + Express learning.

---

## Exercise Summary

```txt
Objective Quiz Score: 32 / 35
Backend Tasks CRUD: Completed
API Testing: Completed
React Tasks UI: Skipped
Ready for MongoDB: Yes
```

---

# Round 1: Objective Basics

## Result

```txt
Score: 10 / 10
```

## Questions Covered

1. What is Node.js used for?
2. What is Express.js?
3. What is `req.body` used for?
4. What is `req.params` used for?
5. Which HTTP method is used to create data?
6. Which HTTP method is used to update data?
7. Which status code is used for successful creation?
8. Which status code is used when data is not found?
9. What is the use of `next()` in middleware?
10. How many parameters does an Express error middleware have?

---

# Round 2: Status Codes Practice

## Result

```txt
Score: 7 / 10
```

## Important Revision

```txt
200 → Success
201 → Created successfully
400 → Bad request / missing or wrong input
401 → Unauthorized / not logged in
403 → Forbidden / logged in but no permission
404 → Data or route not found
409 → Conflict / duplicate data
500 → Internal server error
```

## Weak Area

```txt
400, 403, 404, 409
```

## Final Understanding

```txt
Missing or wrong input      → 400
Wrong id / data not found   → 404
Logged in but no permission → 403
Duplicate/conflict data     → 409
```

---

# Round 3: Middleware and Error Handling

## Result

```txt
Score: 5 / 5
```

## Concepts Covered

```txt
express.json() is middleware.
cors() is middleware.
next() moves request to the next middleware or route.
If middleware does not call next() or send response, request will keep loading.
next(error) sends error to global error middleware.
Error middleware should be placed after all routes.
404 middleware should be placed before global error middleware.
```

## Middleware Flow

```txt
Request
↓
cors()
↓
express.json()
↓
loggerMiddleware
↓
routes
↓
controller
↓
response
```

## Error Flow

```txt
Request
↓
routes
↓
notFoundMiddleware
↓
errorMiddleware
↓
error response
```

---

# Round 4: Routes, Controllers, and Modules

## Result

```txt
Score: 5 / 5
```

## Concepts Covered

```txt
server.js:
App setup, middleware setup, route mounting, server start.

routes file:
Defines API paths and connects them with controller functions.

controller file:
Contains actual API logic like get, create, update, delete.

Express Router:
Used to separate route handlers into different files.

Node.js ES Modules:
Local imports should include .js extension.
```

## Example

```js
import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);
```

```txt
/api/users + router.get("/") = GET /api/users
```

---

# Round 5: asyncHandler, dotenv, and React Basics

## Result

```txt
Score: 5 / 5
```

## Concepts Covered

```txt
dotenv loads environment variables from .env file.
process.env.PORT reads PORT value from environment variables.
asyncHandler catches async controller errors.
response.ok checks whether API response status is successful.
e.preventDefault() stops default form reload in React.
```

## asyncHandler Purpose

```txt
asyncHandler avoids repeated try/catch in every async controller.
It catches async errors and passes them to global error middleware.
```

Example:

```js
export const asyncHandler = (controller) => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
```

---

# Practical Exercise: Tasks CRUD API

## Goal

Create a new backend resource called `tasks`.

Each task contains:

```txt
id
title
status
```

Example:

```json
{
  "id": 1781160698680,
  "title": "Learn asyncHandler",
  "status": "pending"
}
```

---

## Files Created

```txt
src/routes/taskRoutes.js
src/controllers/taskController.js
```

---

## Route Mounted in server.js

```js
import taskRoutes from "./routes/taskRoutes.js";

app.use("/api/tasks", taskRoutes);
```

---

## Completed APIs

```txt
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

# Tasks CRUD Test Result

| API              | Method | Expected Status | Result |
| ---------------- | ------ | --------------: | ------ |
| `/api/tasks`     | GET    |             200 | ✅      |
| `/api/tasks`     | POST   |             201 | ✅      |
| `/api/tasks/:id` | GET    |             200 | ✅      |
| `/api/tasks/:id` | PUT    |             200 | ✅      |
| `/api/tasks/:id` | DELETE |             200 | ✅      |
| `/api/tasks/999` | GET    |             404 | ✅      |
| `/api/wrong-url` | GET    |             404 | ✅      |

---

# Tasks Error Test Result

| Case                     | Expected Status | Result |
| ------------------------ | --------------: | ------ |
| Empty POST body          |             400 | ✅      |
| Empty title              |             400 | ✅      |
| Empty status             |             400 | ✅      |
| Spaces only title/status |             400 | ✅      |
| Wrong task id in GET     |             404 | ✅      |
| Wrong task id in PUT     |             404 | ✅      |
| Wrong task id in DELETE  |             404 | ✅      |

---

# Task CRUD Requirements Completed

```txt
Created taskRoutes.js
Created taskController.js
Used express.Router()
Mounted /api/tasks route in server.js
Used asyncHandler in controllers
Used req.body for POST and PUT
Used req.params.id for GET by id, PUT, DELETE
Used trim() validation
Returned 400 for missing or invalid input
Returned 404 for wrong task id
Returned 201 for task creation
Returned 200 for successful GET, PUT, DELETE
Tested APIs in Thunder Client
```

---

# Final Backend Practical Status

```txt
Tasks CRUD Backend Exercise: Completed
API Testing: Completed
React Tasks UI: Skipped
Ready for MongoDB: Yes
```

---

# Next Learning Topic

```txt
Day 8: MongoDB + Mongoose Basics
```

Topics to learn next:

```txt
What is database?
What is MongoDB?
What is Mongoose?
MongoDB connection
Schema
Model
Replace in-memory array with MongoDB
```
