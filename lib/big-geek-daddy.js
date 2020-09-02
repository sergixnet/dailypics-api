const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://biggeekdad.com/photo-of-the-day/";

async function getFromBigGeekdaddy() {
  try {
    const response = await got(URL_BASE);
    let $ = cheerio.load(response.body);
    const url = $("img[class^=wp-image]").first().attr("src");
    const credit = $("figcaption").text();

    return {
      slug: "big-geek-daddy",
      url,
      title: "",
      credit,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = getFromBigGeekdaddy;
