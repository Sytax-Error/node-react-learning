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
