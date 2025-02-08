// let number = 6;
// let factArr = [6,5,4,3,2,1];

// function factCalcFunc(a, b){
// return a * b;
// }
// let result = factArr.reduce(factCalcFunc);
// console.log(result);

// let factResult = 1;
// for(let i = number; i >= 1; i--){
//     factResult = factResult * i;
// }
// console.log(factResult);

//if we take the number as input then...

// let number = prompt("Enter a number to find its factorial: ");
// let factResult = 1;
// for(let i = number; i >= 1; i--){
//        factResult = factResult * i;
//     }
// alert(factResult);

let arr = [];
let number = prompt("Enter a number to find its factorial: ");
for(let i = 0; i<number; i++){
    arr[i] = number - i;
}
function factCalc(a , b){
    return a * b;
}
let result = arr.reduce(factCalc);
console.log(result);

