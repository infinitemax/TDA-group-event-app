const bcrypt = require('bcrypt');
const { User } = require('../models/tempUsers');
const createError = require('http-errors');
const saltRounds = 10;

exports.register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError(400, "Email already in use"));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).send({
            message: "User registered successfully"
        });
    } catch (error) {
        return next(createError(500, "Server error"));
    }
};