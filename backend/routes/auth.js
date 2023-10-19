const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const pool = require('../config/db.js');
const admin = require('../config/firebaseAdmin');
const { generateSalt } = require('../utils/cryptoUtils');
const path = require("path");
require('dotenv').config({path: path.join(__dirname, '../config/key.env')});
// TODO Consider refresh tokens in conjunction with access tokens
// TODO Integrate firebase-auth

const SECRET_KEY = process.env.JWT_SECRET;
const router = express.Router();

router.post('/register', [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password should be at least 6 characters').isLength({min: 6})
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        // check if user already exists
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userCheck.rows.length > 0) {
            return res.status(400).json({message: "User already exists"});
        }

        // hash the password using Argon2
        const salt = generateSalt(); // generate salt
        const hashedPassword = await argon2.hash(password, {salt: Buffer.from(salt)});
        // here, save the user with the hashed password in the db
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);
        // optionally generate and return a JWT
        // TODO Replace YOUR_SECRET_KEY with the actual key.env
        const token = jwt.sign({id: email}, SECRET_KEY, {expiresIn: '1h'});
        res.status(201).json({token});

    } catch (error) {
        //TODO add more fleshed out error handling
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is requires').exists()
], async (req, res) => {
   // Similar logic to the registration route:
   // 1. Validate the input
   // 2. Fetch the user from the database
   // 3. Use argon2 to verify the password
   // 4. Return a JWT or some other form of session ID if successful
    const {email, password} = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // If user doesn't exist, send error msg
        if (user.rows.length === 0) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // Verify password
        const isValidPassword = await argon2.verify(user.rows[0].password, password);

        if (!isValidPassword) {
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // Generate JWT for user
        const payload = {
            userId: user.rows[0].id
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});

        // send token in res
        return res.json({token});
    } catch (error) {
        // TODO Flesh this out
        console.error(error);
        return res.status(500).send("Server error");
    }
});

// Password Reset Route

// Logout Route

// etc.. Routes
//console.log("JWT_SECRET", process.env.JWT_SECRET);

module.exports = router;

