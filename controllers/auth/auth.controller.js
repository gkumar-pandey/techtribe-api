import User from "../../models/user.model";
import { userSignupSchma } from "../../schemas";
import { comparePassword, generateToken, hashPassword } from "../../utils";

/**
 * @route POST /api/auth/signup
 * @description Handles user registration by creating a new account.
 * @param {Object} req - Express request object containing user data.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or error.
 */
const signupController = async (req, res) => {
  try {
    {
    }
    const { username, password, email, name } = req.body;
    // check all require fields
    const { error, value } = userSignupSchma(req.body);
    if (error) {
      return res
        .status(500)
        .json({ message: "username, password,email required." });
    }

    // check user exists
    const isUserExist = await User.findOne({
      email: email,
      username: username,
    });
    if (isUserExist) {
      return res.status(500).json({ error: "User already exists" });
    }
    // Hash password
    const hashedPassword = hashPassword(password);
    const user = {
      username,
      email,
      password: hashedPassword,
    };
    // save user to database
    const newUser = new User(user);
    await newUser.save();
    // response with token
    const payloadForToken = { _id: newUser._id, email: newUser.email };
    const token = generateToken(payloadForToken);
    // hide password in response
    newUser.password = undefined;
    res.status(201).json({
      message: "signup successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/auth/login
 * @description Handles user authentication and login.
 * @param {Object} req - Express request object containing user credentials.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating login success or failure.
 */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check all required fields
    const { error, value } = loginSchema(req.body);
    if (error) {
      return res
        .status(500)
        .json({ message: "username, password,email required." });
    }
    // check user exist
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist." });
    }
    // check password
    const isPassMatched = await comparePassword(
      password,
      existingUser.password
    );
    if (!isPassMatched) {
      return res.json({ message: "Password not matched!." });
    }

    // generate token
    const payloadForToken = {
      _id: existingUser._id,
      email: existingUser.email,
    };
    const token = generateToken(payloadForToken);
    // Hide password
    existingUser.password = undefined;
    res.status(200).json({
      message: "Login successfully",
      token,
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

export { loginController, signupController };
