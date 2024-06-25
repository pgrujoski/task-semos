const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const create = async (acc) => {
  const user = new User(acc);
  return user.save();
};

const update = async (id, newData) => {
  return await User.updateOne({ _id: id }, newData);
};

const remove = async (id) => {
  return await User.deleteOne({ _id: id });
};

const getById = async (id) => {
  return await User.findOne({ _id: id });
};

const getAll = async () => {
  return await User.find({});
};

const getByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getByEmail,
};
