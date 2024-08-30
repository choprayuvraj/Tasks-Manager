// required modules
const express = require('express');
const authController = require("../controllers/auth-controller");
const authValidator = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

const router = express.Router();

// routes
router.route("/register")
.post(validate(authValidator.registerSchema), authController.register);
router.route("/login")
.post(validate(authValidator.loginSchema), authController.login);

module.exports = router;