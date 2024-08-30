// required modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// add method in userSchema to hash password
userSchema.pre("save", async function(next) {
    const user = this;

    // check if password is modified
    if(!user.isModified("password")) {
        next();
    }

    // hashing password
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
    } 
    catch (error) {
       next(error); 
    }
});

// JWT
userSchema.methods.generateToken = function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d"
            }
        )
    } 
    catch (error) {
       console.error(error); 
    }
}

// comparing password
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

// user model
const User = mongoose.model("User", userSchema);

module.exports = User;