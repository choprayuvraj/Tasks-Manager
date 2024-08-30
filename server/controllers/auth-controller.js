// required modules
const User = require("../models/user-model")

// register logic

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //check if user exist
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            res.status(409).json({ message: "Email already exists" });
        }

        const response = await User.create({
            name,
            email,
            password
        });

        res.status(200).json({
            message: "Registered Successfully",
            userId: response._id.toString(),
            token: await response.generateToken()
        });

        console.log(response);
    } 
    catch (error) {
        res.status(500).json(`Registration: Internal server error - ${error}`);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

    // check if user exists
    const checkUser = await User.findOne({ email });
    if(!checkUser) {
        res.status(404).json({ message: "Invalid Credentials" });
    }

    // check password
    const checkPassword = await checkUser.checkPassword(password);

    if(checkPassword) {
        res.status(200).json({
            message: "Login Successful",
            token: await checkUser.generateToken(),
            userId: checkUser._id.toString()
        });
    }
    else {
        res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    } catch (error) {
        res.status(500).json(`Login: Internal server error - ${error}`);
    }
}

module.exports = { register, login };