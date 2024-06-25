const express = require("express");
const {
  getKursevi,
  createKurs,
  getKursById,
  updateKurs,
  removeKurs,
} = require("../handlers/kursHandler");
const auth = require("../pkg/middleware/auth");

const router = express.Router();

router.route("/").get(getKursevi).post(auth, createKurs);

router
  .route("/:id")
  .get(getKursById)
  .put(auth, updateKurs)
  .delete(auth, removeKurs);

module.exports = router;
