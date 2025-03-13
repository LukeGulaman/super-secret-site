const loveTrainText = ["I love you the most!", "Hey there beautiful :3", "Happy early anniversary!", "Our special day is coming!"];
let lastIndex = 0;

function getRandomInt(max) {
    let i = Math.floor(Math.random() * max);
    if (i == lastIndex) (i >= max) ? i-- : i++;
    return i;
}
function updateText(text){
    let delay = 200;
    let h1 = document.getElementById("trainText");

    if (!h1) {
        clearInterval(interval);
        return;
    }
    
    h1.innerHTML = text
        .split("")
        .map(letter => {
            return `<span>` + letter + `</span>`;
        })
        .join("");
    
    Array.from(h1.children).forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("wavy");
            if (span.textContent == " ") span.style.display = "inline";
        }, index * 60 + delay);
    });
}

updateText(loveTrainText[getRandomInt(3)]);   
let interval = setInterval(() => {
    updateText(loveTrainText[getRandomInt(3)]);
}, 60*1000)