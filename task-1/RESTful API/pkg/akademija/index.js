const mongoose = require("mongoose");

const akademijaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Akademija = mongoose.model("Akademija", akademijaSchema);

const create = async (aka) => {
  const akademija = new Akademija(aka);
  return akademija.save();
};

const update = async (id, newData) => {
  return await Akademija.updateOne({ _id: id }, newData);
};

const remove = async (id) => {
  return await Akademija.deleteOne({ _id: id });
};

const getById = async (id) => {
  return await Akademija.findOne({ _id: id });
};

const getAll = async () => {
  return await Akademija.find({});
};

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
};
