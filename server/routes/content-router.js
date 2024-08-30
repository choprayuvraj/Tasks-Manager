// required modules
const express = require("express");
const contentController = require("../controllers/content-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// routes
router.route("/create")
.post(authMiddleware ,contentController.create);
router.route("/data")
.get(authMiddleware, contentController.data)
router.route("/delete")
.delete(authMiddleware, contentController.deleteController)

module.exports = router;