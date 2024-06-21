const {v4: uuidv4} = require("uuid");
const User = require("../model/user");
const {setUser}= require("../service/auth");	
async function userSignup(request, response) {
  //taking these fields from the request body
  const { name, email, password } = request.body;
  await User.create({
    name,
    email,
    password,
  }); //what all we require from the user for creating the user

  return response.render("/");
}

async function userLogin(request, response) {
  //taking these fields from the request body
  const { email, password } = request.body;
  const user = await User.findOne({
    email,
    password,
  }); //find one user with these values of email and password
  if (!user)
    return response.render("login")({
      error: "invalid username or password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, user);

  //creating a cookie
  response.cookie('uid',sessionId);
  //we can check value of cookie in the middleware , and then compare the value of the sessionid to see who our user is

  
  return response.render("/");
}

module.exports = {
  userSignup,
  userLogin,
};
