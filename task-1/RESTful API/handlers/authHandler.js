const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validate, UserLogin, UserSignUp } = require("../pkg/users/validate");
const user = require("../pkg/users");
const { JWT_KEY } = require("../pkg/config/config");

const register = async (req, res) => {
  try {
    await validate(req.body, UserSignUp);
    const exists = await user.getByEmail(req.body.email);
    if (exists) {
      return res.status(400).send("User with this email already exists!");
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const usr = await user.create(req.body);
    return res.status(201).send(usr);
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).send(err.error);
  }
};

const login = async (req, res) => {
  try {
    await validate(req.body, UserLogin);
    const usr = await user.getByEmail(req.body.email);
    if (!usr) {
      throw {
        code: 400,
        error: "User not found!",
      };
    }
    if (!bcrypt.compareSync(req.body.password, usr.password)) {
      throw {
        code: 400,
        error: "Incorrect password!",
      };
    }
    const payload = {
      fullname: usr.fullname,
      email: usr.email,
      id: usr._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    const token = jwt.sign(payload, JWT_KEY);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(err.code || 500).send(err.error);
  }
};

module.exports = {
  register,
  login,
};
