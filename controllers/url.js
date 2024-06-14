// const {nanoid} = require("nanoid");
// const { nanoid } = require("fix-esm").require("nanoid");
// import { nanoid } from 'nanoid'
// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
// async function loadNanoid() {
//   const { nanoid } = await import("nanoid");
//   return nanoid;
// }
// const nanoid = await loadNanoid();

const shortid = require("shortid");

const URL = require("../model/url");
async function generateNewShortUrl(request, response) {
  const shortId = shortid();
  const body = request.body;
  if (!body.url) return response.status(400).json({ error: "url is required" });
  // console.log(body.url);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return response.json({ id: shortId });
}

async function handleGetAnalytics(request,response){

  const shortId = request.params.shortId;
  await URL.findOne({shortId});  //search for shortId
  return response.json({totalClicks:result.vistHistory.length,analytics:result.visitHistory}) 
  //total number of clicks will be the length of the visitHistory
  
}


module.exports = { generateNewShortUrl , handleGetAnalytics};
