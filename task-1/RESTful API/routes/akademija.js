const express = require("express");
const {
  getAkademija,
  createAkademija,
} = require("../handlers/akademijaHandler");

const router = express.Router();

router.route("/")
    .get(getAkademija)
    .post(createAkademija);

module.exports = router;
