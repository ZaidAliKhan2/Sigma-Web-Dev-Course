let messages = document.querySelectorAll("h1");
let msgsArr = ["Initializing Hacking", "Reading your Files", "Password files Detected", "Sending all passwords and personal files to server", "Cleaning up"];
let span = document.createElement("span");

async function printMsgs() {
    for (let i = 0; i < messages.length; i++) {
        let randTime = Math.floor(Math.random() * 7000);
        await new Promise(resolve => setTimeout(resolve, randTime));
        messages[i].innerHTML = msgsArr[i];
        messages[i].style.color = "white";
        if (messages[i].innerHTML.trim() !== "") {      
            messages[i].appendChild(span);
        }else{
            messages[i].removeChild(span);
        }
    }
    return "Hacking complete!"; 
}

async function print() {
    let result = await printMsgs();
    console.log(result);
}

print();