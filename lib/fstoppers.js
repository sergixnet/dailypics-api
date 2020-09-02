const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://fstoppers.com";

async function getPicFromFstoppers() {
  try {
    const response = await got(`${URL_BASE}/potd`);
    const $ = cheerio.load(response.body);
    const url = $(".photo[data-xlarge]").attr("data-xlarge");
    const title = $(".photo[data-xlarge]").find("img").attr("alt");
    const credit = $(".photo[data-xlarge]")
      .parent()
      .parent()
      .find("a.username")
      .html();

    return {
      slug: "fstoppers",
      url,
      title,
      credit,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = getPicFromFstoppers;
