const connectToDatabase = require("../../lib/connect-database");

module.exports = async function (req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectToDatabase(process.env.MONGODB_URI);
      const collection = await db.collection("pics");
      const pics = await collection.find({}).toArray();
      res.setHeader("Access-Control-Allow-Origin", "*");
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
