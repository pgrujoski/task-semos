const { create, update, remove, getById, getAll } = require("../pkg/kurs");

const getKursevi = async (req, res) => {
  try {
    const kursevi = await getAll();
    res.status(200).json(kursevi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createKurs = async (req, res) => {
  try {
    const kurs = await create(req.body);
    res.status(201).json(kurs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getKursById = async (req, res) => {
  try {
    const kurs = await getById(req.params.id);
    if (!kurs) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(kurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateKurs = async (req, res) => {
  try {
    const kurs = await update(req.params.id, req.body);
    if (!kurs) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(kurs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeKurs = async (req, res) => {
  try {
    const kurs = await remove(req.params.id);
    if (!kurs) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getKursevi,
  createKurs,
  getKursById,
  updateKurs,
  removeKurs,
};
