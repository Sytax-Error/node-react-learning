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
