const express = require("express");
const router = express.Router();

//for frontend router

//basic homepage
router.get("/", async (request, response) => {
  const allurls = await URL.find({});
  return response.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (request, response) => {
  return response.render("signup");
});

module.exports = router;
