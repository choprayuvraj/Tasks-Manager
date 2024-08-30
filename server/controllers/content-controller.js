// required modules
const Content = require("../models/content-model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// create logic
const create = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const jwtToken = token.replace("Bearer ", "").trim();
        const jwtResponse = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const { content } = req.body;
        const response = await Content.create({
            email: jwtResponse.email,
            content,
            isDone: false
        });

        res.status(200).json({
            message: "Created Successfully",
            contentId: response._id.toString(),
            content: response.content
        });
    }
    catch (error) {
        res.status(500).json(`Create: Internal server error - ${error}`);
    }
}

// data logic
const data = async (req, res) => {
    try {
        const token = req.header("Authorization");
        const jwtToken = token.replace("Bearer ", "").trim();
        const jwtResponse = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const responseContent = await Content.find({ email: jwtResponse.email });

        res.status(201).json({
            responseContent
        });
    } 
    catch (error) {
        res.status(500).json(`data: Internal server error - ${error}`);
    }
}

// delete logic
const deleteController = async (req, res) => {
    try {
        const id = req.header("id");
        const mongoId = new mongoose.Types.ObjectId(id);
        console.log(mongoId);

        await Content.deleteOne({ _id: mongoId });

        res.status(201).json({
            id,
            message: "deleted successfully"
        });
    } 
    catch (error) {
        res.status(500).json(`delete: Internal server error - ${error}`);
    }
}

module.exports = {
    create,
    data,
    deleteController
};