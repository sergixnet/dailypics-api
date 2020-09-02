const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://www.socwall.com";

async function getPicFromSocwall() {
  try {
    const response = await got(URL_BASE);
    let $ = cheerio.load(response.body);
    const lastPageElement = $(".pageNumber a").last();
    const randomPageNumber =
      Math.floor(Math.random() * parseInt(lastPageElement.text())) + 1;

    const listResponse = await got(
      `${URL_BASE}/wallpapers/page:${randomPageNumber}`
    );
    $ = cheerio.load(listResponse.body);
    const photoPageUrl = URL_BASE + $("a.image").attr("href");

    const photoPageResponse = await got(photoPageUrl);
    $ = cheerio.load(photoPageResponse.body);
    const url = URL_BASE + $("a.wallpaperImageLink.wallpaperLink").first().attr("href");
    const title = $("h1.wallpaperTitle a.wallpaperLink").text().trim();
    const author = $('.wallpaperAuthor a').first().text();
    const credit = `by ${author} on socwall.com`;

    return {
      slug: "socwall",
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

module.exports = getPicFromSocwall;
