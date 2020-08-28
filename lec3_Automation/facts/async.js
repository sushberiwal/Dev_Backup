let fs = require("fs");

//callback

console.log("Before");
fs.readFile("./f1.txt" , function(err , data){
    console.log("Content " + data);
})
console.log("After");