import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import User from "../../../db/models/userModel.js";
import { AppError, catchAsyncError } from "../../utils/appError.js";
import { sendEmail } from "../../utils/send-email.js";

export const signup = catchAsyncError(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) throw new AppError("User already exists", 400);

  // hashing the password
  const hashedPassword = await bcrypt.hash(req.body.password, 5);

  // generate uniqe OTP
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  // send OTP to user's email
  await sendEmail(
    req.body.email,
    "OTP for Registration",
    `Your OTP is <h1>${otp}</h1>`
  );

  // Create a new user in the database with the provided data and hashed password
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    otpCode: otp,
  });

  // Respond with a success message and the generated token
  res.status(201).json({
    status: "success",
    message: "Your account has been registered successfully",
  });
});

export const login = catchAsyncError(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) throw new AppError("User not found", 404);

  // Compare the password entered with the hashed password in the database
  const isMatch = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );

  // Compare the password entered with the hashed password in the database
  if (!isMatch) throw new AppError("Incorrect password", 400);

  // Generate a JWT token for the new user
  const token = jwt.sign(
    {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    },
    "secretkey"
  );

  // Respond with success message and token
  res
    .status(200)
    .json({ status: "success", message: "Logged in successfully", token });
});
