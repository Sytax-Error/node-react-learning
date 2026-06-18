# Frontend Auth Integration

This frontend connects with the Express backend authentication APIs.

## Auth APIs Used

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
POST /api/auth/logout
```

## Frontend Auth Flow

```txt
Register / Login
↓
Backend returns user + accessToken
↓
Frontend stores auth data in localStorage
↓
AuthContext keeps auth state globally
↓
Protected APIs use Authorization header
↓
Logout clears backend refresh cookie and frontend localStorage
```

---

## Folder Structure

```txt
src/
  config/
    api.js

  features/
    auth/
      authService.js
      AuthContext.jsx
      Login.jsx
      Register.jsx
      Profile.jsx
```

---

## API Base URL

File:

```txt
src/config/api.js
```

```js
export const API_BASE_URL = "http://localhost:5000/api";
```

This avoids repeating the backend URL in every API call.

---

## Auth Service

File:

```txt
src/features/auth/authService.js
```

Auth service contains API functions for authentication.

```js
registerUser(formData)
loginUser(formData)
logoutUser()
getProfile(accessToken)
```

For login and logout, `credentials: "include"` is used because the backend stores the refresh token in an httpOnly cookie.

```js
credentials: "include"
```

---

## Auth Context

File:

```txt
src/features/auth/AuthContext.jsx
```

`AuthContext` manages global auth state.

It stores:

```txt
auth
user
accessToken
isAuthenticated
loading
error
```

After successful login, frontend saves auth data in localStorage.

```js
const authData = {
  user: data.user,
  accessToken: data.accessToken,
};

localStorage.setItem("auth", JSON.stringify(authData));
setAuth(authData);
```

Expected localStorage structure:

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

## Register Flow

```txt
User fills name, email, password
↓
Frontend calls POST /api/auth/register
↓
Backend creates normal user with role: "user"
↓
Frontend shows success message
```

Frontend does not send `role`.

Role is handled by backend.

---

## Login Flow

```txt
User fills email and password
↓
Frontend calls POST /api/auth/login
↓
Backend returns user and accessToken
↓
Frontend saves user and accessToken
↓
Profile page is shown
```

---

## Protected Profile API

Protected profile API uses access token.

```js
headers: {
  Authorization: `Bearer ${accessToken}`,
}
```

Flow:

```txt
Profile component
↓
GET /api/auth/profile
↓
Authorization: Bearer accessToken
↓
Backend protect middleware verifies token
↓
Logged-in user profile is returned
```

---

## Logout Flow

Logout clears both backend and frontend auth data.

```txt
Click Logout
↓
POST /api/auth/logout
↓
Backend clears refresh token cookie
↓
Frontend removes auth from localStorage
↓
Auth state becomes null
```

Frontend clears local auth even if backend logout fails.

---

## Current Frontend Auth Features

```txt
Register form
Login form
AuthContext global state
localStorage auth persistence
Profile from local auth state
Protected server profile API call
Logout with backend API
```
## Common Protected API Helper

Protected APIs need an access token in the request header.

Instead of writing the Authorization header in every API call, a reusable helper is used.

File:

```txt
src/utils/authFetch.js
```

```js
export const authFetch = async (url, options = {}) => {
  const savedAuth = localStorage.getItem("auth");
  const auth = savedAuth ? JSON.parse(savedAuth) : null;

  const accessToken = auth?.accessToken;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
```

## Why authFetch is Useful

```txt
authFetch
↓
reads accessToken from localStorage
↓
adds Authorization header automatically
↓
handles API error response
↓
returns response data
```

Before:

```js
const response = await fetch(`${API_BASE_URL}/auth/profile`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

After:

```js
const data = await authFetch(`${API_BASE_URL}/auth/profile`);
```

## Profile API Using authFetch

File:

```txt
src/features/auth/authService.js
```

```js
export const getProfile = async () => {
  return authFetch(`${API_BASE_URL}/auth/profile`);
};
```

Now the component does not need to pass the access token manually.

```js
const data = await getProfile();
```

This same helper can be reused for protected APIs like:

```txt
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```
## Frontend Tasks Integration

The frontend now connects with protected task APIs from the backend.

Task APIs are user-specific, so logged-in users can only see and manage their own tasks.

## Task APIs Used

```txt
GET    /api/tasks
POST   /api/tasks
DELETE /api/tasks/:id
```

These APIs are protected and require an access token.

The frontend uses `authFetch()` to automatically send the token.

---

## Folder Structure

```txt
src/
  features/
    tasks/
      taskService.js
      TaskForm.jsx
      TaskList.jsx
      TasksPage.jsx
```

---

## Task Service

File:

```txt
src/features/tasks/taskService.js
```

```js
import { API_BASE_URL } from "../../config/api";
import { authFetch } from "../../utils/authFetch";

export const getTasks = async () => {
  return authFetch(`${API_BASE_URL}/tasks`);
};

export const createTask = async (taskData) => {
  return authFetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (taskId) => {
  return authFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
};
```

---

## Fetch Logged-In User's Tasks

```js
const data = await getTasks();
setTasks(data);
```

Backend returns only the logged-in user's tasks.

```txt
GET /api/tasks
↓
authFetch adds Authorization header
↓
Backend verifies token
↓
Backend returns current user's tasks
```

---

## Create Task

Frontend sends only task data.

```json
{
  "title": "Learn frontend tasks",
  "status": "pending"
}
```

Frontend does not send user id.

Backend adds the logged-in user's id using `req.user._id`.

Backend response format:

```json
{
  "message": "Task created.",
  "task": {
    "_id": "task_id",
    "title": "Learn frontend tasks",
    "status": "pending",
    "user": "logged_in_user_id"
  }
}
```

Because the actual task is inside `task`, frontend adds `newTask.task` to state.

```js
const newTask = await createTask(taskData);

setTasks((prevTasks) => [...prevTasks, newTask.task]);
```

This shows the task immediately without page refresh.

---

## Delete Task

```js
await deleteTask(taskId);

setTasks((prevTasks) =>
  prevTasks.filter((task) => task._id !== taskId)
);
```

After successful delete, the task is removed from frontend state.

On page refresh, deleted task does not come back because it is also removed from database.

---

## Component Responsibility

```txt
TaskForm
→ handles create task form UI

TaskList
→ displays tasks and delete button

TasksPage
→ manages API calls, task state, loading state, and errors

taskService
→ contains task API functions
```

---

## Current Task Features

```txt
Fetch logged-in user's tasks
Create task
Show newly created task without refresh
Delete task
Remove deleted task from UI
Use authFetch for protected APIs
```
## Update Task from Frontend

The frontend supports updating an existing task using the protected task update API.

API used:

```txt
PUT /api/tasks/:id
```

---

## Update API Function

File:

```txt
src/features/tasks/taskService.js
```

```js
export const updateTask = async (taskId, taskData) => {
  return authFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
};
```

`authFetch()` automatically sends the access token in the Authorization header.

---

## Edit Mode in Task Form

The same form is used for both create and update.

```txt
No editingTask  → Create Task mode
Has editingTask → Update Task mode
```

When the user clicks Edit, the selected task is stored in parent state.

```js
const [editingTask, setEditingTask] = useState(null);
```

The form receives `editingTask` and fills the selected task data.

```js
useEffect(() => {
  if (editingTask) {
    setFormData({
      title: editingTask.title,
      status: editingTask.status,
    });
  } else {
    setFormData({
      title: "",
      status: "pending",
    });
  }
}, [editingTask]);
```

When cancel is clicked, `editingTask` becomes `null` and the form is cleared.

---

## Updating Task State

After successful update, the backend returns:

```json
{
  "message": "Task updated successfully.",
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "status": "completed",
    "user": "logged_in_user_id"
  }
}
```

The frontend replaces the old task in state with the updated task.

```js
const updatedTask = await updateTask(taskId, taskData);

setTasks((prevTasks) =>
  prevTasks.map((task) =>
    task._id === taskId ? updatedTask.task : task
  )
);

setEditingTask(null);
```

This updates the task immediately without page refresh.

---

## Task CRUD Completed

```txt
Create task
Read logged-in user's tasks
Update task
Delete task
```
## Frontend Routing and Navbar

The frontend uses React Router for page navigation and route protection.

## Routes

```txt
/          → redirects based on login status
/login     → public route
/register  → public route
/tasks     → protected route
/profile   → protected route
```

---

## ProtectedRoute

File:

```txt
src/routes/ProtectedRoute.jsx
```

`ProtectedRoute` allows only logged-in users to access protected pages.

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

Used for pages like:

```txt
/tasks
/profile
```

If the user is not logged in, they are redirected to `/login`.

---

## PublicRoute

File:

```txt
src/routes/PublicRoute.jsx
```

`PublicRoute` prevents logged-in users from opening login/register pages again.

```jsx
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
}
```

Used for:

```txt
/login
/register
```

If the user is already logged in, they are redirected to `/tasks`.

---

## Login Redirect

After successful login, the user is redirected to the tasks page.

```jsx
await login(formData);
navigate("/tasks");
```

Flow:

```txt
Login successful
↓
AuthContext saves user and accessToken
↓
navigate("/tasks")
↓
ProtectedRoute allows access
↓
Tasks page opens
```

---

## Navbar

File:

```txt
src/components/layout/Navbar.jsx
```

The navbar changes based on authentication state.

Logged out user sees:

```txt
Login | Register
```

Logged in user sees:

```txt
Tasks | Profile | Username | Logout
```

Logout flow:

```txt
Click Logout
↓
Backend logout API clears refresh token cookie
↓
Frontend clears localStorage
↓
User is redirected to /login
```

---

## Layout Styling

File:

```txt
src/styles/layout.css
```

The layout stylesheet contains base page styles and navbar styles.

It includes:

```txt
body layout
link reset
navbar container
navbar links
user badge
logout button
```

Current styling approach:

```txt
Create CSS files only when they are needed.
Avoid unused styling files.
Keep styles grouped by feature/layout purpose.
React Router pages
PublicRoute / ProtectedRoute
Navbar
CSS files
Auth pages styling
Tasks page styling
Profile page styling
```


## Auto Refresh Token Handling

The frontend supports automatic access token refresh for protected APIs.

Access tokens are short-lived. When an access token expires, protected APIs return:

```txt
401 Token expired

The authFetch() helper handles this automatically.

Flow:

Protected API request
↓
Access token expired
↓
Backend returns 401 Token expired
↓
authFetch calls POST /api/auth/refresh-token
↓
Browser sends refresh token cookie using credentials: "include"
↓
Backend returns new accessToken
↓
authFetch saves new accessToken in localStorage
↓
authFetch retries original API

Refresh token is stored in an httpOnly cookie, so frontend JavaScript cannot read it directly.

credentials: "include"

is used so the browser sends the cookie automatically.

If refresh token is missing or expired:

Refresh API fails
↓
Frontend removes auth from localStorage
↓
User is redirected to /login

Current behavior:

Valid access token → API works
Expired access token → token refresh + retry
Expired/missing refresh token → logout fallback

```

## Reusable Button Component

The frontend uses a shared `Button` component to keep button UI consistent across the app.

File:

```txt
src/components/ui/Button.jsx
```

The button supports different variants, sizes, disabled state, and full-width layout.

```jsx
<Button type="submit" fullWidth>
  Login
</Button>

<Button variant="secondary">
  Cancel
</Button>

<Button size="sm" variant="danger">
  Delete
</Button>

<Button variant="solid-danger">
  Logout
</Button>
```

---

## Button Props

```txt
variant
→ primary, secondary, danger, solid-danger, ghost

size
→ sm, md

fullWidth
→ makes the button take full width

disabled
→ disables the button

type
→ button, submit, reset
```

---

## Button Styling

File:

```txt
src/styles/ui.css
```

The shared button styles include:

```txt
primary button
secondary button
danger button
solid danger button
ghost button
small and medium sizes
disabled state
hover effects
```

---

## Where Button is Used

The reusable button is used in:

```txt
Login page
Register page
Task form
Task list
Profile page
Navbar logout
```

This avoids repeated button CSS classes across the project.

Old page-specific button classes were removed or replaced with the shared button component.

Examples of replaced classes:

```txt
btn-primary
task-primary-btn
task-secondary-btn
task-edit-btn
task-delete-btn
profile-logout-btn
navbar-logout
```

---

## Why This is Better

```txt
Consistent UI
Less repeated CSS
Cleaner components
Easy to change button design globally
Better industry-style frontend structure
```
## Reusable UI Components

The frontend uses reusable UI components to keep the design consistent and reduce repeated JSX/CSS.

Reusable components are stored in:

```txt
src/components/ui/
```

Current reusable components:

```txt
Button.jsx
Input.jsx
Select.jsx
Card.jsx
Message.jsx
```

---

## Button Component

Used for common actions like login, register, create task, update task, delete, cancel, and logout.

```jsx
<Button type="submit" fullWidth>
  Login
</Button>

<Button variant="secondary">
  Cancel
</Button>

<Button size="sm" variant="danger">
  Delete
</Button>
```

---

## Input Component

Used for text, email, and password fields.

```jsx
<Input
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter email"
/>
```

---

## Select Component

Used for dropdown fields like task status.

```jsx
<Select
  label="Status"
  name="status"
  value={formData.status}
  onChange={handleChange}
  options={[
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
  ]}
/>
```

---

## Message Component

Used for success and error messages.

```jsx
<Message type="success">{successMessage}</Message>
<Message type="error">{error}</Message>
```

---

## Shared UI Styles

Reusable component styles are managed in:

```txt
src/styles/ui.css
```

This includes:

```txt
button variants
input styling
select styling
card styling
message styling
```

---

## Why This Approach

```txt
Consistent UI across pages
Less repeated JSX
Less repeated CSS
Cleaner feature components
Easy global design updates
More industry-style frontend structure
```

## Reusable Card Component

The frontend uses a shared `Card` component for common card layouts.

File:

```txt id="bujwej"
src/components/ui/Card.jsx
```

```jsx id="0jp6x9"
function Card({ children, className = "" }) {
  return <div className={`ui-card ${className}`}>{children}</div>;
}
```

The `Card` component provides a reusable wrapper for sections that need card-style UI.

It is used in:

```txt id="lk6f7e"
Login page
Register page
Task form
Task list
Profile cards
```

Example:

```jsx id="pwilpf"
<Card className="profile-card">
  ...
</Card>
```

This keeps the UI structure consistent and avoids repeated raw card wrapper markup.

## Skeleton Loading UI

The frontend uses skeleton loading for page and card data loading states.

Skeleton loading is better than a spinner when the page structure is already known.

Used in:

```txt
Tasks page
Profile page
```

---

## Skeleton Component

File:

```txt
src/components/ui/Skeleton.jsx
```

The component supports different variants:

```txt
line
card
task-list
```

Example:

```jsx
<Skeleton variant="task-list" count={3} />
<Skeleton variant="card" />
```

---

## Where Skeleton is Used

### Task List Loading

When tasks are loading, the task list shows task-shaped placeholder rows.

```jsx
<Skeleton variant="task-list" count={3} />
```

### Profile Loading

When server profile data is loading, the profile card shows card-style placeholders.

```jsx
<Skeleton variant="card" />
```

---

## Loading Strategy

```txt
Small action loading
→ Button text like "Creating..." or "Updating..."

Page/card content loading
→ Skeleton placeholder UI
This gives a better user experience and keeps the UI feeling modern.

```


## Empty State UI

The frontend uses a reusable empty state component when a list has no data.

File:

```txt
src/components/ui/EmptyState.jsx
```

Example:

```jsx
<EmptyState
  title="No tasks yet"
  description="Create your first task using the form on the left."
/>
```

Used in:

```txt
Task list

When the logged-in user has no tasks, the UI shows a friendly empty state instead of plain text.

This improves the user experience and makes the page look more polished.
```

## Frontend Form Validation

The frontend validates forms before calling backend APIs.

This improves user experience and avoids unnecessary API requests.

---

## Login Validation

Login form validates:

```txt
Email is required
Password is required
```

If validation fails, the API is not called and an error message is shown.

---

## Register Validation

Register form validates:

```txt
Name is required
Email is required
Password is required
Password must be at least 6 characters
```

---

## Task Form Validation

Task form validates:

```txt
Task title is required
Task status is required
```

Spaces-only task titles are also blocked using `trim()`.

Example:

```js
if (!formData.title.trim()) {
  setFormError("Task title is required.");
  return;
}
```

---

## Validation Flow

```txt
User submits form
↓
Frontend checks required fields
↓
If invalid, show Message component
↓
Stop API call
↓
If valid, call backend API
```

Reusable component used for validation messages:

```jsx
<Message type="error">{formError}</Message>
```

This keeps validation messages consistent across auth and task forms.
