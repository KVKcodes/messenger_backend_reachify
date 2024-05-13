import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Message from './models/message.js';
import { readdirSync } from 'fs';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
  //autoload Routes
  readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));
  
  app.post('/api/messages', async (req, res) => {
    try {
      const {
        messageId,
        platform,
        timestamp,
        type,
        messageObj,
        files,
        replyFrom,
        senderType,
        metadata,
        isRead,
        isHandled,
        error
      } = req.body;
  
      // Create a new message using the Message schema
      const newMessage = new Message({
        messageId,
        platform,
        timestamp,
        type,
        messageObj,
        files,
        replyFrom,
        senderType,
        metadata,
        isRead,
        isHandled,
        error
      });
  
      // Save the message to MongoDB
      await newMessage.save();
  
      res.status(201).json({ message: 'Message saved successfully' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
  
  // listen app
  const PORT = process.env.PORT || 8000;
  const HOST = "0.0.0.0"; // Listen on all network interfaces
  app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });
  
  