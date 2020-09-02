const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://www.space.com/34-image-day.html";

async function getFromSpaceCom() {
  try {
    const response = await got(URL_BASE);
    const $ = cheerio.load(response.body);
    const figure = $("[data-bordeaux-image-check]").first();
    const url = figure
      .find("img[data-original-mos]")
      .attr("data-original-mos");
    const title = figure.prev("h2").text();
    const credit = figure.find("figcaption > span.credit").text();

    return {
      slug: "spacecom",
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

module.exports = getFromSpaceCom;
