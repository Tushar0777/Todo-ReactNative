import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();


const app=express();

app.use(cors());
app.use(bodyParser.json());

const pool=new Pool({
    user:'postgres',
    host:process.env.IP_ADDRESS,
    database:'todoapp',
    password:process.env.DB_PASSWORD,
    post:5432,
});

//to check sab theek hai na 
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected successfully:", res.rows);
 
});


app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
});


// 🟢 Add new task (with optional created_by & deadline)
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, created_by, deadline } = req.body;
    const result = await pool.query(
      `INSERT INTO tasks (title, description, created_by, deadline)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description || null, created_by || "Anonymous", deadline || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error adding task");
  }
});


// 🟢 Toggle completion
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    await pool.query("UPDATE tasks SET completed=$1 WHERE id=$2", [completed, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error updating task");
  }
});


app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error deleting task");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));