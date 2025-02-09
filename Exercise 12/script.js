let colorArr = ["red", "blue", "green", "black", "yellow"];

let backColor = ["cyan", "lightblue", "lightgray", "pink", "purple"];

function randomGenerator(){
    let result = Math.floor(Math.random() * 5);
    return result;
}

let random;

let boxes = document.getElementsByClassName("box");

for(let i = 0; i<5; i++){
    random = randomGenerator()
    boxes[i].style.color = colorArr[random];
    boxes[i].style.backgroundColor = backColor[random];
}