const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
connectDB();

app.use(cors({
  origin: "*", 
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Arnifi Blogging API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
