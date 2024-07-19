import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
  content: { type: String, required: true },
  receiverId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Message = model("Message", messageSchema);
export default Message;
