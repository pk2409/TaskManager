const User = require("../model.user");

async function userSignup(request, response) {
  //taking these fields from the request body
  const { name, email, password } = request.body;
  await User.create({
    name,
    email,
    password,
  }); //what all we require from the user for creating the user

  return response.render("home");
}

module.exports = {
  userSignup,
};
