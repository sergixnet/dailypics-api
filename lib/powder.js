const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "http://www.powder.com/photo-of-the-day/";

async function getPicFromPowder() {
  try {
    const response = await got(URL_BASE);
    const $ = cheerio.load(response.body);
    const image = $("img.article__figure-image").first();
    const url = image.attr("src").split("?")[0];
    const title = image.attr("alt");
    const credit = $(".article__title > a")
      .first()
      .text()
      .replace("Photo of the Day:", "")
      .trim();

    return {
      slug: "powder",
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

module.exports = getPicFromPowder;
