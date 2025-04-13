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


app.post("/donors", (req, res) => {
    const {
        fullName: name, email, phone, age, weight, gender, bloodGroup: bloodType,
        address, ailments, medications, diseases, lastDonation
    } = req.body;

    console.log("Step 1: Received Data", req.body); // Log incoming data

    // Validation checks
    if (!name || !email || !phone || !bloodType) {
        console.error("Validation Failed: Missing required fields.");
        return res.status(400).json({ error: "All required fields must be filled." });
    }

    console.log("Step 2: Validation Passed");
    console.log("Dynamic Values to Insert:", [
        name, email, phone, age, weight, gender, bloodType,
        address, ailments, medications, diseases, lastDonation
    ]);

    const sql = `
        INSERT INTO donors (full_name, email, phone, age, weight, gender, blood_group, address, ailments, medications, diseases, last_donation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        name, email, phone, age, weight, gender, bloodType,
        address, ailments, medications, diseases, lastDonation || null
    ], (err, result) => {
        if (err) {
            console.error("Step 3: Database Error:", err.message);
            return res.status(500).json({ error: "A database error occurred. Please try again." });
        }
        console.log("Step 4: Query Success:", result);
        res.json({ message: "Donor registered successfully!" });
    });
});


/*
//Donor reg
app.post("/donors", (req, res) => {
    const {
        name, email, phone, age, weight, gender, bloodType,
        address, ailments, medications, diseases, lastDonation
    } = req.body;

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

    // Insert query (updated to match donors table structure)
    const sql = `
        INSERT INTO donors (full_name, email, phone, age, weight, gender, blood_group, address, ailments, medications, diseases, last_donation)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        "Test User", "test@example.com", "1234567890", 30, 70, "Male", "A+",
        "123 Street", "None", "None", "None", "2023-01-01"
    ], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ error: "A database error occurred." });
        }
        res.json({ message: "Test insert successful!" });
    });
    

    // Execute query-
    db.query(
        sql,
        [name, email, phone, age, weight, gender, bloodType, address, ailments, medications, diseases, lastDonation || null],
        (err, result) => {
            if (err) {
                console.error("Database Error:", err.message);
                return res.status(500).json({ error: "A database error occurred. Please try again." });
            }
            res.json({ message: "Donor registered successfully!" });
        }
    );
});
*/

//Request form
app.post("/recipients", (req, res) => {
    const {
        fullName, age, gender, bloodGroup, volume,
        hospital, address, phone, reason, urgency
    } = req.body;

    // Validation (simple example)
    if (!fullName || !age || !gender || !bloodGroup || !volume || !hospital || !address || !phone || !reason || !urgency) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // SQL Query to insert recipient data
    const sql = `
        INSERT INTO recipient (fullname, age, gender, blood_group_needed, blood_units_required, hospital_name, hospital_address, reason_for_blood, urgency)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    db.query(sql, [
        fullName, age, gender, bloodGroup, volume,
        hospital, address, reason, urgency
    ], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ error: "A database error occurred. Please try again." });
        }
        res.json({ message: "Blood request submitted successfully!" });
    });
});


// Donor-list functions
app.get("/get-donors", (req, res) => {
    const bloodGroup = req.query.bloodGroup || "%"; // Default to all blood groups

    const query = `
        SELECT full_name, blood_group, address, last_donation, phone 
        FROM donors 
        WHERE blood_group LIKE ?`;

    db.query(query, [bloodGroup], (err, results) => {
        if (err) {
            console.error("Error fetching donors:", err);
            return res.status(500).json({ error: "Failed to fetch donor data" });
        }
        res.json(results);
    });
});

//Recipients-list
app.get("/get-recipients", (req, res) => {
    const bloodGroup = req.query.bloodGroup || "%"; // Default to all blood groups

    const query = `
        SELECT fullname, blood_group_needed, blood_units_required, urgency, hospital_name, hospital_address
        FROM recipient
        WHERE blood_group_needed LIKE ?`;

    db.query(query, [bloodGroup], (err, results) => {
        if (err) {
            console.error("Error fetching recipients:", err.message);
            return res.status(500).json({ error: "Failed to fetch recipient data" });
        }
        res.json(results);
    });
});

// Blood bank details
app.get("/get-blood-stock", (req, res) => {
    const { bloodBankId, bloodGroup } = req.query;

    let query = `
        SELECT blood_bank_id, blood_group, units_available
        FROM blood_stock
        WHERE 1 = 1`; // Always true, used for adding optional conditions

    const params = [];
    if (bloodBankId) {
        query += " AND blood_bank_id = ?";
        params.push(bloodBankId);
    }
    if (bloodGroup) {
        query += " AND blood_group = ?";
        params.push(bloodGroup);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching blood stock:", err.message);
            return res.status(500).json({ error: "Failed to fetch blood stock data." });
        }
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
