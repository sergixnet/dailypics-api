const cheerio = require("cheerio");
const got = require("got");

const URL_BASE =
  "https://www.outdoorphotographer.com/blog/category/photo-of-the-day/";

async function getfromOutdoorPhotographer() {
  try {
    const response = await got(URL_BASE);
    let $ = cheerio.load(response.body);
    const pageUrl = $(".deck a.btn.btn-green").attr("href");
    const pageResponse = await got(pageUrl);
    $ = cheerio.load(pageResponse.body);
    const url = $('meta[property="og:image"]').attr("content");
    const title = $('meta[property="og:description"]').attr("content");
    const credit = $('.wp-caption-text').text();

    return {
      slug: "outdoor-photographer",
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

module.exports = getfromOutdoorPhotographer;
