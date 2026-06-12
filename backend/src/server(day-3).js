import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); //reads JSON body

let users = [];
let projects = [];
// ***********************  USERS CRUD OPERATION *********************************
app.get("/api/users", (req, res) => {
  res.json(users); // send JSON response
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }
  res.json(user);
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const { name, role } = req.body; //data sent in POST/PUT

  const user = users.find((user) => user.id === id);

  if (!user) {
    // not found
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!name?.trim() || !role?.trim()) {
    // bad request
    return res.status(400).json({
      message: "Name and role are required",
    });
  }

  user.name = name.trim();
  user.role = role.trim();

  res.json({
    message: "User updated successfully",
    user: user,
  });
});

app.post("/api/users", (req, res) => {
  const { name, role } = req.body;

  if (!name?.trim() || !role?.trim()) {
    return res.status(400).json({
      message: "Name and Role are required.",
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
  // created
  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); //dynamic value from URL
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "user not found.",
    });
  }

  users = users.filter((user) => user.id !== id);

  res.json({
    message: "user deleted sucessfully.",
  });
});

// ***********************  PROJECTS CRUD OPERATION *********************************

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const { name, tech } = req.body;

  if (!name?.trim() || !tech?.trim()) {
    return res.status(400).json({
      message: "name and tech required.",
    });
  }

  const cleanName = name.trim();
  const cleanTech = tech.trim();

  const newProject = {
    id: Date.now(),
    name: cleanName,
    tech: cleanTech,
  };

  projects.push(newProject);

  res.status(201).json({
    message: "Project created successfully.",
    data: newProject,
  });
});

app.get("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find((pro) => pro.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found.",
    });
  }

  res.json(project);
});

app.put("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);

  const { name, tech } = req.body;

  const project = projects.find((pro) => pro.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found.",
    });
  }

  if (!name?.trim() || !tech?.trim()) {
    return res.status(400).json({
      message: "Name and tech are rquired.",
    });
  }

  project.name = name.trim();
  project.tech = tech.trim();

  res.json({
    message: "Project updated successfully.",
    project: project,
  });
});

app.delete("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find((pro) => pro.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found.",
    });
  }

  projects = projects.filter((pro) => pro.id !== id);

  res.json({
    message: "project deleted.",
  });
});

app.listen(5000, () => {
  console.log("Sever is running on port: 5000");
});
