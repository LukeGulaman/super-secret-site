const body = document.body;
const welcomeText = document.getElementById("welcomeText");

let hasClicked = false;

function clickScreen(elem) {
    if (hasClicked) return;

    hasClicked = true;
    body.style.overflow = "hidden";

    elem.style.width = "300vw";
    elem.style.height = "300vw";
    elem.style.backgroundColor = "rgba(255,255,255,0)";

    welcomeText.style.opacity = 0;
    startClock();
    
    setTimeout(() => {
        elem.remove();
    }, 2500)
}