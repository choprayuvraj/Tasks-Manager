const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next()
    } 
    catch (err) {
        const error = {
           status: 400,
           message: "Fill the input properly",
           extraDetails: err.errors[0].message
        };
        next(error);
    }
}

module.exports = validate;