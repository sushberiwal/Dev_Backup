let request = require("request");
let cheerio = require("cheerio");


function getAllMatches(link){
    request( link , cb);
}



function cb(error , response , html){
    if(error==null && response.statusCode == 200){
        parseData(html);
    }
    else if(response.statusCode == 404){
        console.log("Page not found !")
    }
    else{
        console.log(error);
    }
}

function parseData(html){
    console.log(html);
    console.log("Inside all matches");
}


module.exports = getAllMatches;