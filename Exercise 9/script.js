//faulty Calculator.

let num1 =  Number(prompt("Enter number 1:"));
let num2 = Number(prompt("Enter number 2:"));
let result;
let funcresult;

let randomNum = Math.random() * 100;
let choice = prompt("Enter the operation you would like to do?: +, -, *, /");
if (choice == "+") {
    result = addFunc(num1, num2, randomNum)
    alert("Your answer after summation is: "+ result);
}
else if (choice == "-") {
    result = subFunc(num1, num2, randomNum)
    alert("Your answer after subtraction is: "+ result);
}
else if (choice == "*") {
    result = multFunc(num1, num2, randomNum)
    alert("Your answer after multiplication is: "+ result);
}
else if (choice == "/") {
    result = divideFunc(num1, num2, randomNum)
    alert("Your answer after division is: "+ result);
}
else{
    alert("Wrong Choice!!! enter any of four operations only");
}
function addFunc(num1, num2, randNum) {
    if (randNum <= 10) {
        funcresult = num1 - num2;
    }
    else {
        funcresult = num1 + num2;
    }
    return funcresult;
} 
function subFunc(num1, num2, randNum){
    if (randNum <= 10) {
        if(num2 == 0){
            alert("Not possible to divide by 0");
        }else{
            funcresult = num1 / num2;
        }  
    }
    else {
        funcresult = num1 - num2;
    }
    return funcresult;
}
function multFunc(num1, num2, randNum){
    if (randNum <= 10) {
        funcresult = num1 + num2;
    }
    else {
        funcresult = num1 * num2;
    }
    return funcresult;
}
function divideFunc(num1, num2, randNum){
    if (randNum <= 10) {
        funcresult = num1 ** num2;
    }
    else {
        if(num2 == 0){
            alert("Not possible to divide by zero");
        }else{
            funcresult = num1 / num2;
        }
    }
    return funcresult;
}