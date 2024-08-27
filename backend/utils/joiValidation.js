import Joi from "joi";
class JoiValidation {
  static logInBodyValidation(body) {
    const schema = Joi.object({
      email: Joi.string().email().required().label("email"),
      password: Joi.string().required().label("password"),
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

  static updateMovieRatingValidation(body) {
    const schema = Joi.object({
      name: Joi.string().required().label("Movie Name"),
      rating: Joi.number().required().label("Movie Rating"),
      description: Joi.string().required().label("Movie Description"),
    });
    return schema.validate(body);
  }

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
