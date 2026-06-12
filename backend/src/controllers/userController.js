let users = [];

export const getUsers = (req, res) => {
  res.status(200).json(users);
};

export const createUser = (req, res) => {
  const { name, role } = req.body;

  if (!name?.trim() || !role?.trim()) {
    return res.status(400).json({
      message: "Name and role are required",
    });
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    role: role.trim(),
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

export const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).json({
      message: "User not found.",
    });
  }

  res.json(user);
};

export const updateUser = (req, res) => {
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
};

export const deleteUser = (req, res) => {
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
};
