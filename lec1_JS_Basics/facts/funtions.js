// functions are variables => functions can be sent as a paramter'=

// high order function => it is a function which accepts other functions as a paramter


//fullName = "Steve Rogers";
function getFirstName(fullName){
    return fullName.split(" ")[0];
}

function getLastName(fullName){
// return last name
return fullName.split(" ")[1];
}


function greeter(fullName , callback){
    let name = callback(fullName);
    console.log(name);
}

greeter("Steve Rogers" , getFirstName);
greeter("Steve Rogers" , getLastName);




