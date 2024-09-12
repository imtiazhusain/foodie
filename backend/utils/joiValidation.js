import Joi from "joi";
class JoiValidation {
  static logInBodyValidation(body) {
    const schema = Joi.object({
      email: Joi.string().email().required().label("email"),
      password: Joi.string().required().label("password"),
    });
    return schema.validate(body);
  }

  static editUser(body) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required().label("Name"),
      email: Joi.string().email().required().label("Email"),
      user_id: Joi.string().required().label("User ID"),
      password: Joi.string()
        .optional() // Makes the field optional
        .allow("") // Explicitly allow an empty string
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_+\\-=\\[\\]{};:'\"\\\\|,.<>\\/?]).{8,30}$"
          )
        )
        .messages({
          "string.pattern.base":
            "Password must have 8-30 chars, 1 uppercase, 1 lowercase, and 1 special character",
          "string.empty": "Please provide password",
          "string.length": "Password must be between 8 and 30 characters long",
          "any.required": "Password field is required",
        })
        .label("Password"),
    });

    return schema.validate(body);
  }

  static verifyEmailValidation(body) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      OTP: Joi.string()
        .length(4)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid OTP",
          "string.empty": "OTP field cannot be empty. Please provide OTP.",
          "string.length": "Invalid OTP.",
          "any.required": "Please provide the OTP to proceed",
        }),
    });

    return schema.validate(body);
  }

  static sendOTPValidation(body) {
    const schema = Joi.object({
      userEmail: Joi.string().email().required(),
      userId: Joi.string().required(),
    });

    return schema.validate(body);
  }

  static createFodItemValidation(body) {
    const schema = Joi.object({
      name: Joi.string().required().label("Item Name"),
      category: Joi.string().required().label("Item category"),
      description: Joi.string().required().label("Item Description"),
      price: Joi.number().required().label("Item Price"),
      image: Joi.string().required().label("Item Image"),
    });
    return schema.validate(body);
  }

  static editFoodItemValidation = () => {
    const schema = Joi.object({
      name: Joi.string().required().label("Item Name"),
      category: Joi.string().required().label("Item category"),
      description: Joi.string().required().label("Item Description"),
      price: Joi.number().required().label("Item Price"),
    });

    return schema.validate(schema);
  };

  static registerUserValidation(body) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required().label("Name"),
      email: Joi.string().email().required().label("Email"),
      profile_pic: Joi.string().required().label("Profile Picture"),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$"
          )
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must have  7+ chars, 1 uppercase, 1 lowercase, 1 special char",
          "string.empty": "Please provide password",
          "string.length":
            "Password must have  7+ chars, 1 uppercase, 1 lowercase, 1 special char",
          "any.required":
            "Password must have  7+ chars, 1 uppercase, 1 lowercase, 1 special char",
        }),
    });

    return schema.validate(body);
  }
}

export default JoiValidation;
