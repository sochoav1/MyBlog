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

app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;

    const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
    stmt.run(postId, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    });
});

app.put('/posts/:id', (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const stmt = db.prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?");
    stmt.run(title, content, postId, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Post updated successfully" });
    });
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "1234";

// Registro
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos (aquí solo es un ejemplo)
    const user = { id: Date.now(), username, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: "User registered successfully!" });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario en la base de datos (esto es solo un ejemplo)
    const user = users.find(u => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generar token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});
