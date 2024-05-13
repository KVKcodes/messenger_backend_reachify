import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  //should be true
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: false, 
  // },
  messageId: {
    type: String,
    required: false,
  },
  platform: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    required: false,
  },
  type: {
    type: String,
    enum: ["txt", "media", "location", "contact"],
    required: false,
  },
  messageObj: {
    type: Object,
    default: {},
  },
  messageText: {
    type: String,
    default: "",
  },
  // files: [
  //   {
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //     metadata: {
  //       type: {
  //         type: String,
  //         required: true,
  //       },
  //       size: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   },
  // ],
  // replyFrom: {
  //   type: String,
  // },
  senderType: {
    type: String,
    enum: ["client", "bot", "me"],
    required: false,
  },
  // metadata: [
  //   {
  //     key: {
  //       type: String,
  //       required: true,
  //     },
  //     value: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  // isRead: {
  //   type: Boolean,
  //   default: false,
  // },
  // isHandled: {
  //   type: Boolean,
  //   default: false,
  // },
  error: {
    code: {
      type: String,
    },
    message: {
      type: String,
    },
  },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;