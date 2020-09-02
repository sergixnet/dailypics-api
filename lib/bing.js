const got = require("got");
const URL_BASE = "https://www.bing.com";

async function getPicFromBing() {
  try {
    const response = await got(
      `${URL_BASE}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US`
    );

    const data = JSON.parse(response.body);
    const url = data.images[0].url;
    const title = data.images[0].title;
    const credit = data.images[0].copyright;

    return {
      slug: "bing",
      url: `${URL_BASE}${url}`,
      title,
      credit,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

module.exports = getPicFromBing;
