const {z} = require("zod");

// object register schema
const registerSchema = z.object({
    name: z
        .string({required_error: "Name is required"})
        .trim()
        .min(3, "Name must have atleast 3 characters")
        .max(10, "Name must not contain more than 10 characters"),

    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Invalid Email"})
        .min(3, "Email must have atleast 3 characters")
        .max(255, "Email must not contain more than 10 characters"),

    password: z
        .string({required_error: "Password is required"})
        .trim()
        .min(10, "Password must have atleast 3 characters")
        .max(25, "Email must not contain more than 10 characters"),
});

// object login schema
const loginSchema = z.object({
    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Invalid Email"})
        .min(3, "Email must have atleast 3 characters")
        .max(255, "Email must not contain more than 10 characters"),

    password: z
        .string({required_error: "Password is required"})
        .trim()
        .min(10, "Password must have atleast 3 characters")
        .max(25, "Email must not contain more than 10 characters"),
});

module.exports = { registerSchema, loginSchema };