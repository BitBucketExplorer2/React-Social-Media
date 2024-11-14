const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const connectDatabase = require("./config/database");

const app = express();
const multer = require("multer");
const path = require("path");

/**
 * setting up config file
 */
dotenv.config({ path: "api/config/config.env" });
/**
 * connect Database
 */
connectDatabase();
// dotenv.config();
// const URL = process.env.DB_URI
// mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log(`Database Connected Successfully`)
// })

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// =======

/**
 * Upload File using Muter
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});

//    API Routing
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

/**
 * Start The Server
 */

const PORT = process.env.MY_PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is Running On The Port Of - ${PORT}`);
});
