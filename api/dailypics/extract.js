const connectToDatabase = require("../../lib/connect-database");
const getPicFromBing = require("../../lib/bing");
const getPicFromFstoppers = require("../../lib/fstoppers");
const getPicFromNasa = require("../../lib/nasa");
const getPicFromWallheaven = require("../../lib/wallheaven");
const getPicFromSocwall = require("../../lib/socwall");
const getFromSpaceCom = require("../../lib/spacecom");
const getFromBigGeekdaddy = require("../../lib/big-geek-daddy");
const getFromOutdoorPhotographer = require("../../lib/outdoor-photographer");
const getFromAstronomy = require("../../lib/astronomy");
const getFromPicsum = require("../../lib/picsum");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const {
      body: { extract = "" },
    } = req;
    if (extract !== process.env.EXTRACT_KEY) {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
    try {
      const db = await connectToDatabase(process.env.MONGODB_URI);
      const collection = await db.collection("pics");
      const allPics = await Promise.all([
        getPicFromBing(),
        getPicFromFstoppers(),
        getPicFromNasa(),
        getPicFromWallheaven(),
        getPicFromSocwall(),
        getFromSpaceCom(),
        getFromBigGeekdaddy(),
        getFromOutdoorPhotographer(),
        getFromAstronomy(),
        getFromPicsum(),
      ]);
      await collection.deleteMany({});
      await collection.insertMany(allPics);
      const pics = await collection.find({}).toArray();
      res.status(200).send({
        date: new Date().toDateString(),
        pics,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(405).send({
      message: "Not allowed",
    });
  }
};
