const music = document.getElementById("music");

const p = document.getElementById("pBox");
const divBody = document.getElementById("divBody");
const titleBox = document.getElementById("titleBox");

music.volume = 0.5;

setTimeout(() => {
    pBox.style.opacity = "1";
    pBox.style.maxHeight = "2000px";
    titleBox.style.paddingTop = "10%";
    document.body.style.overflow = "visible";
    divBody.style.justifyContent = "start";
}, 6500)