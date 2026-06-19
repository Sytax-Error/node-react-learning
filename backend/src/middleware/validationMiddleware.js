export const validateTaskBody = (req, res, next) => {
  const { title, status } = req.body;

  const allowedStatuses = ["pending", "in-progress", "completed"];

  if (!title || !title?.trim()) {
    res.status(400);
    throw new Error("Task title is required");
  }

  if (!status || !status?.trim()) {
    res.status(400);
    throw new Error("Task status is required");
  }

  if (!allowedStatuses.includes(status.trim())) {
    res.status(400);
    throw new Error("Invalid task status");
  }

  next();
};

export const validateRegisterBody = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name?.trim()) {
    res.status(400);
    throw new Error("Name is required");
  }

  if (!email || !email?.trim()) {
    res.status(400);
    throw new Error("Email is required");
  }

  if (!password || !password?.trim()) {
    res.status(400);
    throw new Error("Passwrod is required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  next();
};

export const validateLoginBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email?.trim()) {
    res.status(400);
    throw new Error("Email is required");
  }

  if (!password || !password?.trim()) {
    res.status(400);
    throw new Error("Password is required");
  }

  next();
};

export const validateCreateUserBody = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const allowedRoles = ["admin", "user"];

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Name is required");
  }

  if (!email || !email.trim()) {
    res.status(400);
    throw new Error("Email is required");
  }

  if (!password || !password.trim()) {
    res.status(400);
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  if (!role || !role.trim()) {
    res.status(400);
    throw new Error("Role is required");
  }

  if (!allowedRoles.includes(role.trim())) {
    res.status(400);
    throw new Error("Invalid user role");
  }

  req.body.name = name.trim();
  req.body.email = email.trim();
  req.body.password = password.trim();
  req.body.role = role.trim();

  next();
};

export const validateUpdateUserBody = (req, res, next) => {
  const { name, role } = req.body;

  const allowedRoles = ["admin", "user"];

  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("Name is required");
  }

  if (!role || !role.trim()) {
    res.status(400);
    throw new Error("Role is required");
  }

  if (!allowedRoles.includes(role.trim())) {
    res.status(400);
    throw new Error("Invalid user role");
  }

  req.body.name = name.trim();
  req.body.role = role.trim();

  next();
};

export const validateTaskQuery = (req, res, next) => {
  const { status, page, limit } = req.query;

  const allowedStatuses = ["pending", "in-progress", "completed"];

  if (status && !allowedStatuses.includes(status.trim())) {
    res.status(400);
    throw new Error("Invalid task status filter");
  }

  if (page && (Number(page) <= 0 || Number.isNaN(Number(page)))) {
    res.status(400);
    throw new Error("Page must be a positive number");
  }

  if (limit && (Number(limit) <= 0 || Number.isNaN(Number(limit)))) {
    res.status(400);
    throw new Error("Limit must be a postive number");
  }

  if (page) {
    req.query.page = page.trim();
  }

  if (limit) {
    req.query.limit = page.trim();
  }

  if (status) {
    req.query.status = status.trim();
  }

  next();
};
