// print to console
// console.log("Hello World !");
// left to right , top to down

//data types => int , float , double , char , string , 
// ES5 , ES6 => let , const
let a = 10;
let b = 20.5;
let c = "Hello world";
let d = 'a';

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

//js datatypes => Number , object , string , undefined , null
let z;
// console.log(z);
 
let arr = [12 , 45 , "abcd" , 12.78 , "Sushant" ,  [1,2,3,4,5] , "end" ];
// console.log(arr);

function sayHi(firstname , lastname){
    console.log(firstname + " says hi !!");
    return 10;
}

// sayHi();
// console.log(  sayHi( "Steve" ,  "Rogers" )  );

// let , const => block scoped 
// const => constant
// const pi = 3.14;

// objects => key values pair
let obj = {
    name : "Steve Rogers",
    state:"New York",
    saysHi : function(){
        console.log("function says hi !!!");
        return 10;
    },
    skills : ["Fighting" , "Shield" , "SuperAbility"],
    age:10
}

//notation => dot notation , Brackets notations
let key = "name";
// console.log(obj.key);
// console.log(obj[key]);
// console.log(obj.saysHi());

// functions are variables => variables can be passed as a paramter => functions can be passed as a parameter

// functions which take functions as an paramter is known as high order functions
// functions sent as an paramter are known as callback functions 
let myFun =  function ( cb ){
     console.log("function says Hi!!!");
     cb();
     return 20;
 };
 
 function cb(){
     console.log("hello i am callback function !!");
}
console.log(myFun(cb));

























