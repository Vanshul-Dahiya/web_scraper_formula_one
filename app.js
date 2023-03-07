import * as cheerio from "cheerio";
import fetch from "node-fetch";
// import Express from "express";
// const port = 3000;
// const app = Express();

async function getFormulaOneDrivers() {
  try {
    // fetch data from url and store the res into a const
    const res = await fetch("https://www.formula1.com/en/drivers.html");
    // convert res into text
    const body = await res.text();

    const items = [];
    // load body data
    const $ = cheerio.load(body);

    // select each col-12 class name and iterate through list
    $(".listing-items--wrapper > .row > .col-12").map((i, el) => {
      // select class and grab content using text method
      const rank = $(el).find(".rank").text();
      const points = $(el).find(".points > .f1-wide--s").text();
      const firstName = $(el).find(".listing-item--name span:first").text();
      const lastName = $(el).find(".listing-item--name span:last").text();
      const team = $(el).find(".listing-item--team").text();
      const photo = $(el).find(".listing-item--photo img").attr("data-src");

      //   push data into array
      items.push({
        rank,
        points,
        firstName,
        lastName,
        team,
        photo,
      });
    });
    console.log(items);
  } catch (error) {
    console.log(error);
  }
}
getFormulaOneDrivers();

// app.listen(port, () => {
//   console.log(`running on ${port}`);
// });
