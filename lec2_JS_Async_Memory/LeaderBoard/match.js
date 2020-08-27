let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");
let count=0;
let lb = [];

function findMatch(link){
    console.log("Sending Requests");
    count++;
    request(link , cb);
}

function cb(error , response , html){
    if(error==null && response.statusCode == 200){
        console.log("Recived Response");
        parseData(html);
        count--;
        if(count == 0){
            console.table(lb);
        }
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
    let winningTeam = ch(".summary span").text();
    winningTeam = winningTeam.split("won")[0].trim();
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("Innings")[0].trim();
        // console.log(teamName);
        if(winningTeam == teamName){
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
                    createLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes);
                }
            }
        }
    }
}

function createLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes){
    console.log("Inside leader Board")
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i=0 ; i<lb.length ; i++){
        if(lb[i].Team == teamName && lb[i].Name == batsmanName){
            lb[i].Runs += runs;
            lb[i].Balls += balls;
            lb[i].Fours += fours;
            lb[i].Sixes += sixes;
            return;
        }
    }
    let obj = {
        Team : teamName,
        Name : batsmanName ,
        Runs : runs ,
        Balls : balls ,
        Fours : fours,
        Sixes : sixes
    }
    lb.push(obj);
}


module.exports = findMatch;