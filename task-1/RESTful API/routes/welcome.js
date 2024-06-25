const express = require("express");
const { getAll } = require("../pkg/kurs");
const router = express.Router();

router.get("/welcome", async (req, res) => {
  try {
    const courses = await getAll();
    res.render("welcome", { courses });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
