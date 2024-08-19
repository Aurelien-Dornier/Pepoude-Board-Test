import Joi from "joi";

const userSchame = Joi.object({
  username: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"))
    .required(),
  role: Joi.string().valid("user", "admin").required(),
});

export const validateUser = (req, res, next) => {
  const { error } = userSchame.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details[0].message,
    });
  }
  next();
};
