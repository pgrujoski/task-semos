const { create, update, remove, getById, getAll } = require("../pkg/akademija");

const getAkademija = async (req, res) => {
  try {
    const akademii = await getAll();
    res.status(200).json(akademii);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAkademija = async (req, res) => {
  try {
    const akademija = await create(req.body);
    res.status(201).json(akademija);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAkademija,
  createAkademija,
};
