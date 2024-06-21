const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(request, response, next) {
  const useruid = request.cookies.uid;
  if (!useruid) {
    return response.redirect("/login");
  }
  if (!user) {
    return response.redirect("/login");
  }

  request.user = user;
  next();
}

async function checkAuth(request,response,next) {
  const useruid = request.cookies.uid;
  const user = getUser(useruid);

  request.user = user;
  next();
}

module.exports ={restrictToLoggedInUserOnly,checkAuth};

//for cookies , install cookieparser package
