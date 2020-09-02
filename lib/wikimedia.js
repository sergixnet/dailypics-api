const cheerio = require("cheerio");
const got = require("got");

const today = new Date().toISOString().slice(0, 10);
const URL_BASE = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&generator=images&formatversion=2&iiprop=url&titles=Template%3APotd%2F${today}`;

async function getfromWikimedia() {
  try {
    const response = await got(URL_BASE);
    const data = JSON.parse(response.body);
    const url = data.query.pages[0].imageinfo[0].url;
    let title = data.query.pages[0].title
      .replace(/\.jpg$/i, "")
      .replace(/^File:/i, "");

    const credit = "Wikimedia";

    return {
      slug: "wikimedia",
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

module.exports = getfromWikimedia;
