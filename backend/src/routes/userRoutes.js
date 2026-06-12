import express from "express";

const router = express.Router();

let users = [];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });
  }

  res.json(user);
});

router.post("/", (req, res) => {
  const { name, role } = req.body;

  if (!name?.trim() || !role?.trim()) {
    return res.status(400).json({
      message: "Name and role are required",
    });
  }

  const cleanName = name.trim();
  const cleanRole = role.trim();

  const newUser = {
    id: Date.now(),
    name: cleanName,
    role: cleanRole,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  const { name, role } = req.body;

  if (!name?.trim() || !role?.trim()) {
    return res.status(401).json({
      message: "Name and Role are required.",
    });
  }

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  user.name = name?.trim();
  user.role = role?.trim();

  res.json({
    message: "user updated successfully.",
    user: user,
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  users = users.filter((item) => item.id !== id);

  res.json({
    message: "user deleted successfully.",
  });
});

export default router;
