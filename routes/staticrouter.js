const express = require("express");
const router = express.Router();

//for frontend router

//basic homepage
router.get("/", async (request, response) => {
  if(!request.user) return response.redirect('./login')
  const allurls = await URL.find({createdBy:request.user._id});
  return response.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (request, response) => {
  return response.render("signup");
});

router.get("/login", (request, response) => {
  return response.render("login");
});

module.exports = router;

//create uuid = unique id which can be use as session id to be stored when a user makes a login