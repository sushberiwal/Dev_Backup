let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");

function findMatch(link){
    request(link , cb);
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
    let ch = cheerio.load(html);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("Innings")[0];
        console.log(teamName);
        let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
        for(let j=0 ; j<allRows.length-1 ; j++){
            let allCols = ch(allRows[j]).find("td");
            if(allCols.length > 1){
                let batsmanName = ch(allCols[0]).find("a").text().trim();
                let runs = ch(allCols[2]).text().trim();
                let balls = ch(allCols[3]).text().trim();
                let fours = ch(allCols[5]).text().trim();
                let sixes = ch(allCols[6]).text().trim();
                let sr = ch(allCols[7]).text().trim();
                // console.log(`Batsman= ${batsmanName} Runs= ${runs} Balls= ${balls} Fours= ${fours} Sixes= ${sixes} SR= ${sr}`);
                processDetails(teamName , batsmanName , runs , balls , fours , sixes , sr);
            }
        }
    }
}

function checkTeamFolder(teamName){
    return fs.existsSync(teamName);
}
function checkBatsmanFile(teamName , batsmanName){
    //path => India/V_Kohli.json
    // let filePath = `${teamName}/${batsmanName}.json`;
    let filePath = path.join(teamName , batsmanName+".json");
    return fs.existsSync(filePath);
}
function createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}
function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr){
    let filePath = path.join(teamName , batsmanName+".json");
    let entries = [];
    let obj = {
        Runs : runs ,
        Balls : balls,
        Fours : fours ,
        Sixes : sixes,
        StrikeRate : sr
    }
    entries.push(obj);
    let data = JSON.stringify(entries);
    fs.writeFileSync(filePath , data);
}
function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr){
    let filePath = path.join(teamName , batsmanName+".json");
    let data = fs.readFileSync(filePath);
    let entries = JSON.parse(data);
    let obj = {
        Runs : runs ,
        Balls : balls,
        Fours : fours ,
        Sixes : sixes,
        StrikeRate : sr
    }
    entries.push(obj);
    data = JSON.stringify(entries);
    fs.writeFileSync(filePath , data);
}
function processDetails(teamName , batsmanName , runs , balls , fours , sixes , sr){
    //check Team Folder Exists ?
    let teamFolderExists = checkTeamFolder(teamName);
    if(teamFolderExists){
        //check if batsman file exists ?
        let batsmanFileExists = checkBatsmanFile(teamName , batsmanName);
        if(batsmanFileExists){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , sr);
    }
}



module.exports = findMatch;