const got = require("got");

const URL_BASE = "https://www.nationalgeographic.com/photography/photo-of-the-day/";

async function getPicFromNationalGeographic() {
  try {
    const response = await got(`${URL_BASE}_jcr_content/.gallery.json`);
    const data = JSON.parse(response.body);    
    const image = data.items[0].image;
    const {uri: url, title, credit} = image;

    return {
      slug: "national-geographic",
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

module.exports = getPicFromNationalGeographic;
