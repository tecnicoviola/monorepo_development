import "dotenv/config";
import express from "express";
import prismaClient from "@repo/db/client";

const app = express();

app.use(express.json());

// GET: Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();

    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error"
    });
  }
});

// POST: Create a new user
app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      error: "Username and password are required"
    });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password
      }
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error"
    });
  }
});

app.listen(8000, () => {
  console.log("Backend server running on port 8000");
});
