import Joi from "joi";
import { v4 as uuid } from "uuid";

//Validate user schema
const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

exports.Signup = async (req, res) => {
  const { User } = req.context.models;
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
    var user = await User.findOne({
      email: result.value.email,
    });
    if (user) {
      return res.json({
        error: true,
        message: "Email is already in use",
      });
    }
    const hash = await User.hashPassword(result.value.password);
    const id = uuid(); //Generate unique id for the user.
    result.value.userId = id;
    //redundant hence deletion from db
    delete result.value.confirmPassword;
    result.value.password = hash;

    const newUser = new User(result.value);
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

exports.Login = async (req, res) => {
  const { User } = req.context.models;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Cannot authorize user.",
      });
    }
    //1. Find if any account with that email exists in DB
    const user = await User.findOne({ email: email });
    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found",
      });
    }

    //2. Verify the password is valid
    const isValid = await User.comparePasswords(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        error: true,
        message: "Invalid credentials",
      });
    }
    await user.save();

    //Success
    return res.send({
      success: true,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
};
