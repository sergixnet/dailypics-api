const cheerio = require('cheerio');
const got = require("got");

const now = new Date();
const day = now.getUTCDate() + 1;
const month = now.getUTCMonth();

const URL_BASE = `https://picsum.photos/v2/list?page=${month}&limit=50`;

async function getFromPicsum() {
  try {
    const response = await got(URL_BASE);
    const data = JSON.parse(response.body);
    const photo = data[day];
    const { download_url: url, author: credit, url: pageUrl } = photo;
    const pageResponse = await got(pageUrl);
    const $ = cheerio.load(pageResponse.body);
    const title = $('title').text().split('–')[0];

    return {
      slug: "picsum",
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

module.exports = getFromPicsum;
