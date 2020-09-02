const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://unsplash.com/";

async function getPicFromUnsplash() {
  try {
    const response = await got(URL_BASE);
    let $ = cheerio.load(response.body);
    const photoUrl =
      URL_BASE + $('a:contains("Photo of the Day")').attr("href").slice(1);
    const title = $('a:contains("Photo of the Day")').attr("title");
    const photoResponse = await got(photoUrl);
    $ = cheerio.load(photoResponse.body);
    const url = $(`img[alt="${title}"]`)
      .attr("src")
      .replace(/&w=\d+/gi, "&w=1920");
    const credit = $("meta[name='twitter:title']").attr("content");

    return {
      slug: "unsplash",
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

module.exports = getPicFromUnsplash;
