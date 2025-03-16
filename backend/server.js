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

// Admin Login Route (Validates Against 'admin' Table)
app.post("/admin-login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM admin WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            console.log("Invalid credentials: no matching user found");
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const admin = results[0];

        if (password !== admin.password) {
            console.log("Invalid credentials: password mismatch");
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: admin.admin_id, username: admin.username },
            process.env.SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.json({ success: true, token });
    });
});


// User Registration
app.post("/register", (req, res) => {
    const { email, dob, name, blood_group, contact, address } = req.body;

    const sql = `
        INSERT INTO users (name, dob, blood_group, contact, email, address, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, dob, blood_group, contact, email, address, dob], (err, result) => {
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

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const user = results[0];

        // Direct comparison of passwords
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token for session management
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.json({ success: true, token });
    });
});


// Donor Registration with Validation
app.post("/donor", (req, res) => {
    const { name, email, phone, age, weight, gender, bloodType, address, ailments, medications, diseases, lastDonation } = req.body;

    // Validation checks
    if (age < 18 || age > 65) {
        return res.status(400).json({ error: "Age must be between 18 and 65 years." });
    }
    if (weight < 50) {
        return res.status(400).json({ error: "Weight must be at least 50 kg." });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
    }

    // SQL query
    const sql = `INSERT INTO donors (name, email, phone, age, weight, gender, blood_type, address, ailments, medications, diseases, last_donation)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, email, phone, age, weight, gender, bloodType, address, ailments, medications, diseases, lastDonation || null], 
    (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
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
