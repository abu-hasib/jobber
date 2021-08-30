import Joi from "joi";
import { v4 as uuid } from "uuid";

//Validate user schema
const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
    //Check if the email has been already registered.
    var user = await req.context.models.User.findOne({
      email: result.value.email,
    });
    if (user) {
      return res.json({
        error: true,
        message: "Email is already in use",
      });
    }
    const hash = await req.context.models.User.hashPassword(
      result.value.password
    );
    const id = uuid(); //Generate unique id for the user.
    result.value.userId = id;
    //redundant hence deletion from db
    delete result.value.confirmPassword;
    result.value.password = hash;

    const newUser = new req.context.models.User(result.value);
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({
      error: true,
      message: "Cannot Register",
    });
  }
};
