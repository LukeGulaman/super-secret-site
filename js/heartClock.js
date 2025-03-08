const root = document.querySelector(":root"),
    timeText = document.getElementById("time"),
    heartTick = document.getElementById("heartTick"),
    trainText = document.getElementById("trainText"),

    anniversaryDate = new Date("2025-03-13T19:01:00"),
    startOfFile = new Date("2025-02-11T12:00:00"),

    tick1 = new Audio("assets/sounds/tick1.mp3"),
    tick2 = new Audio("assets/sounds/tick2.mp3");

const oneDay = 24 * 60 * 60 * 1000;

let intervalId;
let tick = 0;

function nodeScriptReplace(node) {
    if (nodeScriptIs(node) === true) {
        node.parentNode.replaceChild(nodeScriptClone(node), node);
    }
    else {
        var i = -1, children = node.childNodes;
        while (++i < children.length) {
            nodeScriptReplace(children[i]);
        }
    }

    return node;
}
function nodeScriptClone(node) {
    var script = document.createElement("script");
    script.text = node.innerHTML;

    var i = -1, attrs = node.attributes, attr;
    while (++i < attrs.length) {
        script.setAttribute((attr = attrs[i]).name, attr.value);
    }
    return script;
}

function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
}

function changeTime(startDate, endDate) {
    let diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;

    while (diff > 1) {
        if (diff > 8.64e+7) { // days
            d++; diff -= 8.64e+7;
            continue;
        }
        if (diff > 3.6e+6) { // hours
            h++; diff -= 3.6e+6;
            continue;
        }
        if (diff > 60000) { // minutes
            m++; diff -= 60000;
            continue;
        }
        if (diff > 1000) { // seconds
            s++; diff -= 1000;
            continue;
        }
        diff -= diff;
    }

    timeText.textContent = `${d} day${(d > 1) ? "s" : ""}, ${h} hour${(h > 1) ? "s" : ""}, ${m} minute${(m > 1) ? "s" : ""}, ${s} second${(s > 1) ? "s" : ""} left`
}
function timePercentage(startDate, currentDate, endDate) {
    const startTime = new Date(startDate).getTime();
    const sp1 = new Date(endDate).getTime() - startTime;
    const sp2 = new Date(currentDate).getTime() - startTime;

    return Math.round(sp2 / sp1 * 10000) / 100;
}
function transitionToPage() {
    clearInterval(intervalId);
    intervalId = null;

    fetch("new.html").then(response => response.text()).then(text => {
        document.querySelector('html').innerHTML = text;
        nodeScriptReplace(document.getElementsByTagName("body")[0]);
    });
}
function startClock() {
    setTimeout(() => {
        // synced clock
        heartTick.style.animation = "1s rotateGradient infinite linear";
        intervalId = setInterval(() => {
            const date = new Date();
            timeLeft = timePercentage(startOfFile, date, anniversaryDate);
            root.style.setProperty("--degree", `${(360 * (timeLeft / 100)).toFixed(2)}deg`);

            changeTime(date, anniversaryDate);
            document.title = `${Math.round(Math.abs((date - anniversaryDate) / oneDay))} days left :3`;

            if (timeLeft >= 100) {
                return transitionToPage();
            }

            if ((tick % 2) == 0) tick1.play(); else tick2.play();
            tick++;
        }, 1000)
    }, 1000 - new Date().getMilliseconds());
}

changeTime(new Date(), anniversaryDate);