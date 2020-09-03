const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = `https://astronomy.com`;

async function getFromAstronomy() {
  try {
    const response = await got(URL_BASE + "/photos/picture-of-day");
    const $ = cheerio.load(response.body);
    const url = URL_BASE + $('.potd .hero img').attr('src');
    const title = $('.potd .hero img').attr('alt');
    const credit = $('.byline').text();

    return {
      slug: "astronomy",
      url: encodeURI(url),
      title,
      credit,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = getFromAstronomy;
