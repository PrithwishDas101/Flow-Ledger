import jwt from "jsonwebtoken";

import User from '../models/User.js'

// jwt token generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// Registering users
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageURL } = req.body;

    // validation for missing credentials
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    };

    try {
        // checking for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." })
        };

        // creating the user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageURL,
        });

        res.status(201).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageURL: user.profileImageURL,
            },
            token: generateToken(user._id),
        });


    } catch (err) {
        res.status(500).json({ message: "Failed to register user.", error: err.message });
    }
}

// user login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // validation for missing credentials
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." })
    };

    try {

        const user = await User.findOne({ email });

        // validation for non existent users
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" })
        };

        res.status(200).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageURL: user.profileImageURL,
            },
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to login user.", error: err.message });
    }
}

// get user info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            message: "Failed to get user info.",
            error: err.message,
        });
    }
};