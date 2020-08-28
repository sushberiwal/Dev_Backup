let fs = require("fs");

console.log("Before");

//promises

let pendingPromise = fs.promises.readFile("./f1.txt");
console.log(pendingPromise);

pendingPromise.then(function(data){
    console.log("inside then");
    console.log("Content "+ data);
});


pendingPromise.catch(function(error){
    console.log("inside catch");
console.log(error);
})


console.log("After");
