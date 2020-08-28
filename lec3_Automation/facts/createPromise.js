let fs = require("fs");



function promisify(path){

    let promise = new Promise( function(resolve , reject){
        fs.readFile(path , function(error , data){
            if(error == null){
                resolve("Content " + data);
            }
            else{
                reject(error);
            }
        })
    });
   
    return promise;
}


let pendingPromise = promisify("./f1.txt");

pendingPromise.then(function(data){
  console.log("Inside then 😄"  );
    console.log(data);
})

pendingPromise.catch(function(err){
    console.log("Inside catch");
    console.log(error);
})

