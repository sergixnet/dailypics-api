const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://apod.nasa.gov/apod/";

async function getPicFromNasa() {
  try {
    const response = await got(`${URL_BASE}astropix.html`);
    const $ = cheerio.load(response.body);

    let url = URL_BASE;
    const image = $("a > img").attr("src");

    if (image) {
      url += image
    } else {
      // get the thumbnail from youtube
      // https://img.youtube.com/vi/<videoid>/maxresdefault.jpg
      const src = $('iframe').attr('src');
      const videoId = src.match(/\/([\w\-]+)\?/i)[1];
      url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }

    const title = $("center > b:first-child").first().text().trim();
    const credit = 'Nasa - https://apod.nasa.gov/apod/astropix.html';

    return {
      slug: "nasa",
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

module.exports = getPicFromNasa;
