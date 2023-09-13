const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./database.db');

// Create a table for blog posts if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT)");

// Sample route to fetch all posts
app.get('/posts', (req, res) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({"posts": rows});
    });
});

// Sample route to add a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    db.run("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], function(err) {
        if(err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({"postId": this.lastID});
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
