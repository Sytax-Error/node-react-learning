import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Node.js Backend");
});

app.get("/api/users", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Lavesh",
      skill: "React js",
    },
    {
      id: 2,
      name: "Aminesh",
      Skill: "React Native",
    },
  ]);
});

app.get("/api/profile", (req, res) => {
  res.json([
    {
      name: "Lavesh",
      role: "React Developer learning Node.js",
      experience: "7+ years",
    },
    {
      name: "Aminesh",
      role: "React Native Developer learning Node.js",
      experience: "5+ years",
    },
  ]);
});

app.get("/api/projects", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Pragyan Dashboard",
      tech: "React.js",
    },
    {
      id: 2,
      name: "Node Learning API",
      tech: "Node.js",
    },
  ]);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
