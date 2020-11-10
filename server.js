const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));

// Test Route
app.get("/", (req, res) => {
  res.send("Working");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`Running on ${PORT}...`));
