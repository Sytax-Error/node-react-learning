# Node.js + Express.js + React Learning Notes

## Purpose

This repo is for learning backend development with **Node.js + Express.js** and connecting it with **React.js** frontend.

```txt
React.js  → Frontend/UI
Node.js   → Runs JavaScript outside browser
Express.js → Framework to create backend APIs
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

Express.js is a Node.js framework used to create APIs easily.

Common uses:

```txt
Create routes
Handle requests
Send responses
Use middleware
Build REST APIs
```

---

## Basic Terms

| Term           | Meaning                               |
| -------------- | ------------------------------------- |
| `req`          | Incoming request from frontend/client |
| `res`          | Response sent from backend            |
| `req.body`     | Data sent in request body             |
| `req.params`   | Dynamic value from URL                |
| `res.json()`   | Sends JSON response                   |
| `res.status()` | Sends HTTP status code                |

---

## HTTP Methods

| Method | Purpose              |
| ------ | -------------------- |
| GET    | Read/fetch data      |
| POST   | Create new data      |
| PUT    | Update existing data |
| DELETE | Remove data          |

---

## CRUD Meaning

```txt
C → Create  → POST
R → Read    → GET
U → Update  → PUT
D → Delete  → DELETE
```

---

## express.json()

Used to read JSON data sent from frontend/Postman.

```txt
Without express.json(), req.body may be undefined.
```

---

## CORS

CORS allows React frontend and Node backend to communicate when they run on different ports.

Example:

```txt
React frontend → localhost:5173
Node backend   → localhost:5000
```

---

## API Status Codes

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

## Validation

Frontend validation improves user experience.

Backend validation is required for safety.

```txt
Never depend only on frontend validation.
Always validate data on backend also.
```

---

## trim()

Used to remove extra spaces from input values.

Useful for blocking values like:

```txt
"     "
```

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

## Loading and Error State

Loading state is used when API request is running.

Error state is used when API request fails.

```txt
loading → show "Loading..."
error   → show error message
empty   → show "No data found"
```

---

## try...catch...finally

Used to handle API errors safely.

```txt
try     → API logic
catch   → Error handling
finally → Always runs
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

---

## routes Responsibility

```txt
Define API paths
Connect API routes to logic
Keep server.js clean
```

---

## Node.js Modules

A module means one file can export something and another file can import it.

Used for splitting code into separate files.

```txt
export → share from file
import → use in another file
```

In Node.js ES Modules, local imports need `.js` extension.

Correct:

```txt
./routes/userRoutes.js
```

Wrong:

```txt
./routes/userRoutes
```

---

## File Scope

Variables created inside one file are available only inside that file.

To use them in another file, we need export/import.

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

---

## Current Completed APIs

### Users

```txt
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Projects

```txt
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

---

## Next Topics

```txt
Controllers
Middleware
dotenv
MongoDB
Mongoose models
Authentication
JWT
Password hashing
Protected routes
Deployment
```
