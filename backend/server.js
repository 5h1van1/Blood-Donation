// Import required modules
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Error:", err);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

// User Registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "User registered successfully!" });
    });
});

// Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.SECRET_KEY, // Use .env secret key
            { expiresIn: "1h" }
        );
        res.json({ success: true, token });
    });
});

// Donor Registration
app.post("/donor", (req, res) => {
    const { name, age, bloodType, email } = req.body;
    const sql = `INSERT INTO donors (name, age, blood_type, email) VALUES (?, ?, ?, ?)`;

    db.query(sql, [name, age, bloodType, email], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Donor registered successfully!" });
    });
});

// Fetch Donors by Blood Group
app.get("/donors", (req, res) => {
    const { bloodType } = req.query;
    const sql = `SELECT * FROM donors WHERE blood_type = ?`;

    db.query(sql, [bloodType], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// Blood bank details
app.get("/blood-bank", (req, res) => {
    db.query("SELECT * FROM blood_stock", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
