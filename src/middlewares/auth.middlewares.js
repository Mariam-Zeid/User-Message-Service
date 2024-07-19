import jwt from "jsonwebtoken";
import { AppError, catchAsyncError } from "../utils/appError.js";

export const auth = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) throw new AppError("Access denied. No token provided", 404);
  const baseToken = token.replace("Bearer ", "");
  const decoded = jwt.verify(baseToken, "secretkey");
  if (!decoded) throw new AppError("Invalid token", 498);
  req.user = decoded;
  next();
});
