const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup a new user
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
        const newUser = new User({ email, passwordHash });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '_id email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

module.exports = { signup, login, getUsers };
