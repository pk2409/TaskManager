const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connect");

const staticRoute = require("./routes/staticrouter");

const path = require("path");

const URL = require("./model/url");

const app = express();
const port = 8080;
app.listen(port, () => console.log("server started at port"));

app.set("view engine", "ejs"); //telling express to use ejs as view engine
app.set("views", path.resolve("./views")); //telling express where to find views
// app.arguments("/url", urlRoute); //if ends with nay url , we have to use urlroute

app.use(express.json()); // to read incoming json data

//for dynamically ensuring short id redirects to original link
app.get("/:shortId", async (request, response) => {
  const shortId = request.params.shortId; //id that we get from the use
  const entry = await URL.findOneAndUpdate(
    {
      //find one and update it , we use shortid to find the one
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        }, //we have to push into array visitHistory
      },
    }
    //in return it gives us original entry
  );
  //then we redirect the user
  //   response.redirect(entry.redirectUrl);
});
app.use(express.urlencoded({ extended: false })); //to support data coming from the form which is not in json type
app.use("/url", urlRoute);

const userRoute = require("./routes/user");
app.use("/user", userRoute);

app.use("/", staticRoute);

app.get("/test", async (request, response) => {
  const allUrls = await URL.find({});
  return response.render("home", {
    urls: allUrls,
    name: "I am Awesome",
  }); //because our file is called home
});

connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("connected to the database")
);
