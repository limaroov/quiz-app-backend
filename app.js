const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:5500",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importing Routes
const quizRoutes = require("./routes/quizRoutes");
const themeRoutes = require("./routes/themeRoutes");
const questionRoutes = require("./routes/questionRoutes");
const groupRoutes = require("./routes/groupRoutes");

// Importing Middlewares
const { errorHandler } = require("./middleware/errorMiddleware");

// Setting Endpoints
app.use("/api/quiz", quizRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/group", groupRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server Started on PORT : ${PORT}`.bgCyan.underline);
    });
  } catch (error) {
    console.log("Something Went Wron :", error.message);
  }
};

start();
