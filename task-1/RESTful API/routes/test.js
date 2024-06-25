const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  const message = "Тест за backend развој на софтвер";
  console.log(`Rendering test view with message: ${message}`);
  res.render("test", { message });
});

module.exports = router;
