/* Create a business name generator by combining list of adjectives and shop name and another word
Adjectives:
Crazy 
Amazing
Fire 

Shop Name:
Engine
Foods
Garments

Another Word:
Bros
Limited
Hub
*/

console.log("Random Bussiness Name Generator:");
let result;

result = `${adjectivesFunc()} ${NameFunc()} ${anotherWordFunc()}`;
console.log(`Your business name using random words is: ${result}`);

function randomNoGenerator(){
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    return randomNumber;
}
function adjectivesFunc(){
    let rand = randomNoGenerator();
    const adjObj = {
        1: "Crazy",
        2: "Amazng",
        3: "Fire"
    };
    return adjObj[rand];
}
function NameFunc(){
   let rand =  randomNoGenerator();
    const nameObj = {
        1: "Engine",
        2: "Foods",
        3: "Garments"
    };
    return nameObj[rand];
}
function anotherWordFunc(){
    let rand = randomNoGenerator();
    const anotherWordObj = {
        1: "Bros",
        2: "Limited",
        3: "hub"
    };
    return anotherWordObj[rand];
}