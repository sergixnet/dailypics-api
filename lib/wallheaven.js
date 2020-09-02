const cheerio = require("cheerio");
const got = require("got");

const URL_BASE = "https://wallhaven.cc";

async function getPicFromWallheaven() {
  try {
    const response = await got(`${URL_BASE}/random?categories=100&purity=000`);
    let $ = cheerio.load(response.body);
    const photoId = $("figure[data-wallpaper-id]")
      .first()
      .attr("data-wallpaper-id");
    const photoResponse = await got(`${URL_BASE}/w/${photoId}`);
    $ = cheerio.load(photoResponse.body);
    const url = $("#wallpaper").attr("src");
    const title = $("#wallpaper")
      .attr("alt")
      .replace(/^\w+\s\d+x\d+/gi, "")
      .trim();
    const user = $("a.username.usergroup-2").text();
    const credit = `User ${user} from wallhaven.cc`;
    return {
      slug: "wallheaven",
      url,
      title: title.charAt(0).toUpperCase() + title.slice(1),
      credit,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = getPicFromWallheaven;
