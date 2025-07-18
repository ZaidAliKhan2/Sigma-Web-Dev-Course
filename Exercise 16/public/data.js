export const allDataArr = [];

let nameArr = ["Zaid", "Saif", "Savera", "Ayesha"];
let languageArr = ["Python", "Java", "Javascript", "C++"];
let cityArr = ["Karachi", "Lahore", "Hyderabad", "Islamabad"];

export function alldataFunc() {
  for (let i = 0; i < 10; i++) {
    let randNo = Math.floor(Math.random() * 4);
    let isManager = randNo > 1;
    let obj = {
      name: nameArr[randNo],
      city: cityArr[randNo],
      salary: (randNo + 1) * 10000,
      language: languageArr[randNo],
      isManager: isManager
    };
    allDataArr.push(obj);
  }
  console.log(allDataArr);
}
