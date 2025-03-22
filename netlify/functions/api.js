const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 连接
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // 显式启用 SSL
    serverSelectionTimeoutMS: 5000, // 5 秒内无响应则报错
    socketTimeoutMS: 45000, // 防止长时间无响应卡死
  })
  .then(() => console.log("MongoDB 连接成功"))
  .catch((err) => {
    console.error("MongoDB 连接失败:", err.message);
    // 记录完整的错误堆栈
    console.error(err.stack);
  });
const resumeSchema = new mongoose.Schema({
  personalInfo: Object,
  education: Array,
  experience: Array,
});

const Resume = mongoose.model("Resume", resumeSchema);

// API 路由
app.post("/save", async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    console.log("Resume saved successfully");
    res.status(201).json({ message: "Resume saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/resumes", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//
module.exports.handler = serverless(app);
