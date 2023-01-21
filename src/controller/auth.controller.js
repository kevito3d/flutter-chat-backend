const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = await generateJWT(user.id);

    res.status(201).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password is not valid",
      });
    }
    const token = await generateJWT(user.id);
    res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
      error,
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  const token = await generateJWT(uid);
  const user = await User.findById(uid);
  res.status(200).json({
    ok: true,
    user,
    token,
  });
};


module.exports = {
  createUser,
  loginUser,
  renewToken,
};
