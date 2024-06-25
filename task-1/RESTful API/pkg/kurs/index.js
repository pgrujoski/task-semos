const mongoose = require("mongoose");

const kursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  academy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Akademija",
  },
});

const Kurs = mongoose.model("kurs", kursSchema);

const create = async (add) => {
  const kurs = new Kurs(add);
  return kurs.save();
};

const update = async (id, newData) => {
  return await Kurs.updateOne({ _id: id }, newData);
};

const remove = async (id) => {
  return await Kurs.deleteOne({ _id: id });
};

const getById = async (id) => {
  return await Kurs.findOne({ _id: id });
};

const getAll = async () => {
  return await Kurs.find({});
};

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
};
