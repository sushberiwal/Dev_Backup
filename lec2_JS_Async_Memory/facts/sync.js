// Synchronous => top to left down to right
// Core2duo => multitasking => Asynchronous => Mutithreading

let fs = require("fs");

console.log("Before");

let content = fs.readFileSync("./f1.txt") ; 
console.log("Content : " + content );

console.log("After");

