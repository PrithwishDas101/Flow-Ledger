import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, "Full name is required"],
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        required: [true, "Password is required"],
    },

    profileImageURL: {
        type: String,
        default: null,
    }
}, {
    timestamps: true
})

// Hashing password before saving
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing Passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;