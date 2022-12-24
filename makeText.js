/** Command-line tool to generate Markov text. */

const fs = require("fs");
const MarkovMachine = require('./markov');
const axios = require("axios");
const process = require("process");


function createText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}


/** read file and generate text from it. */

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Unreadable file: ${path}: ${err}`);
      process.exit(1);
    } else {
      createText(data);
    }
  });

}


/** read URL and make text from it. */


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  createText(resp.data)
}




let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}