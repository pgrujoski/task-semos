const { Validator } = require("node-input-validator");

const UserSignUp = {
  email: "required|email",
  password: "required|string",
  fullname: "required|string",
};

const UserLogin = {
  email: "required|email",
  password: "required|string",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = await v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = {
  UserSignUp,
  UserLogin,
  validate,
};
