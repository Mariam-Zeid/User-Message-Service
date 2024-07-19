import Message from "../../../db/models/messageModel.js";
import User from "../../../db/models/userModel.js";
import { AppError, catchAsyncError } from "../../utils/appError.js";

export const sendMessage = catchAsyncError(async (req, res) => {
  const isUserExist = await User.findById({ _id: req.body.receiverId });
  if (!isUserExist) throw new AppError("User not found", 404);

  if (req.user.id === req.body.receiverId)
    throw new AppError("You can't send message to yourself", 400);

  const message = await Message.create(req.body);

  res.status(200).json({ message });
});

export const getMessages = catchAsyncError(async (req, res) => {
  const messages = await Message.find({ receiverId: req.user.id });
  if (!messages) throw new AppError("You have no messages", 400);
  res.status(200).send(messages);
});

export const deleteMessage = catchAsyncError(async (req, res) => {
  const message = await Message.findById({ _id: req.params.messageId });
  if (!message) throw new AppError("Message not found", 404);

  const isMessageOwner = await User.findById({ _id: message.receiverId });

  if (isMessageOwner.id !== req.user.id)
    throw new AppError("You are not allowed to delete this message", 401);

  await message.deleteOne();

  res.status(200).json({
    message: "Message deleted successfully",
  });
});
