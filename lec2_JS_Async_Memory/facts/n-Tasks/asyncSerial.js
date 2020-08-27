let fs = require("fs");
let files = ["./f1.txt" , "./f2.txt" , "./f3.txt" , "./f4.txt"];

//for loop / while loop => async serial task not possible

// recursivily
console.log("Before");
function fileReader(idx){
    if(idx == files.length){
        return;
    }
    fs.readFile(files[idx] , function(error , data){
        console.log("Content " + data);
        fileReader(idx+1);
    })
}
fileReader(0);
console.log("After");

