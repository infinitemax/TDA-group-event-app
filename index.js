require("dotenv").config();
const port = 3001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const createError = require("http-errors");
const { User } = require("./models/tempUsers");
const userRoutes = require("./routes/userRoutes");
const { v4: uuid } = require("uuid");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(`Connected to the database at mongodb`))
  .catch((error) => console.log(error));

app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(helmet());

app.post("/auth", async (req, res, next) => {
  console.log("logging in");
  const loginEmail = req.body.email;
  const password = req.body.password;
  try {
    // check for user
    const user = await User.findOne({ email: loginEmail });
    if (!user) {
      return next(createError(404, "No user found!"));
    }

    // check password
    if (password !== user.password) {
      return next(createError(401, "Incorrect password"));
    }

    // give user a token
    user.token = uuid();
    await user.save();
    res.send({
      token: user.token,
    });
  } catch (error) {
    return next(createError(500, "Server error"));
  }
});

// check header for auth token

app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const user = await User.findOne({ token: authHeader });
  if (user) {
    next();
  } else {
    return next(createError(403, "Unauthorised"));
  }
});

const eventRoutes = require("./routes/events");
app.use("/", eventRoutes);
app.use("/", userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
