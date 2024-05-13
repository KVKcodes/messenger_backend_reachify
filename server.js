import express from "express";
import mongoose from "mongoose"; // Import Mongoose
// import { readdirSync } from "fs";
import cors from 'cors';
import { config } from "dotenv";

config();

const app = express();
app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
//autoload Routes
// readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));

app.post('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello akka uwu' });
});

app.post("/api/messages", async (req, res) => {
  try {
    const { messageId, platform, timestamp, type, messageObj, error } = req.body;

    // Create a new message using the Message schema
    const newMessage = new Message({
      messageId,
      platform,
      timestamp,
      type,
      messageObj,
      error
    });

    // Save the message to MongoDB
    await newMessage.save();

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