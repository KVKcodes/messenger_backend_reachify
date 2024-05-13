import express from "express";
import mongoose from "mongoose"; // Import Mongoose
// import { readdirSync } from "fs";
import cors from 'cors';
import { config } from "dotenv";
import Message from './models/message.js';
import bodyParser from 'body-parser';

config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
//autoload Routes
// readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));

app.post('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello akka uwu' });
});

app.post("/api/messages", async (req, res) => {
  try {
    console.log(req.body);
    const { messageId, platform, timestamp, type, messageObj, text, error } = req.body;
    console.log("got a request");

    // Create a new message using the Message schema
    const newMessage = await Message.create({
      "messageId": messageId,
      "platform": platform,
      "timestamp": timestamp,
      "type": type,
      "messageObj": messageObj,
      "messageText": text,
      "error": error
    });

    console.log(newMessage);


    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`) ;
});