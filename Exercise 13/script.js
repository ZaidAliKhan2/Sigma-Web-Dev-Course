
let container = document.querySelector(".container");
console.log(container);
function createCard(title, cName, views, monthsOld, duration, thumbnail){
    let card = document.createElement("div");  
    card.style.display = "flex";
    let formattednumber;
    if (views >= 1000000) {
        formattednumber = (views / 1000000).toFixed(1) + "M"; 
    } else if (views >= 1000) {
        formattednumber = (views / 1000).toFixed(1) + "k"; 
    } else {
        formattednumber = views.toString(); 
    }
    card.innerHTML = `<span><img src = "${thumbnail}"><p>${duration}</p></span><div><p>${title}</p>\n<span>${cName}</span>\n<span>${formattednumber}</span>\n<span>${monthsOld}</span></div>`;
    container.appendChild(card);
    card.classList.add("card")
}
createCard("Introduction to Backend | Sigma Web Dev video #2", "CodeWithHarry", 560000, "7 months ago", "31:22", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")
