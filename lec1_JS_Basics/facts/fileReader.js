let fs = require("fs");
//npm install cheerio
let cheerio = require("cheerio");


let content = fs.readFileSync("index.html" , "utf8");

let ch = cheerio.load(content);

let imgKaData = ch("img").attr("src");

// console.log(imgKaData);

// let pKaData = ch("ul li p").text();
// console.log(pKaData);


// classes and id ?
let pKaData = ch(".pa.main").text();
console.log(pKaData);

let h1KaData = ch("#unique").text();
console.log(h1KaData);
