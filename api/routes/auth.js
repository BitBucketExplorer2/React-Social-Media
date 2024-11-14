const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * Register User Here
 */
router.post("/register", async (req, res) => {
  var xuserName, xemail, xPassword;

  xuserName = req.body.username;
  xemail = req.body.email;
  xPassword = req.body.password;

  try {
    /**
     * Password Incryption/Incrypt
     */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(xPassword, salt);
    xPassword = "";
    xPassword = hashedPassword;

    /**
     * Create New User
     */
    const user = await new User({
      username: xuserName,
      email: xemail,
      password: xPassword,
    });

    /**
     * Save User And Generate Response
     */
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
});

/**
 * Login User
 */

router.post("/login", async (req, res) => {
  try {
    var xemail, xPassword;
    xemail = req.body.email;
    xPassword = req.body.password;

    const user = await User.findOne({ email: xemail });
    !user && res.status(404).json("User Not Found");

    const isValidPassword = await bcrypt.compare(xPassword, user.password);
    !isValidPassword && res.status(400).json("Invalid Credentials !");

    res.status(200).json(user);
  } catch (err) {
    return res.sendStatus(500).json(err);
  }
});

module.exports = router;
