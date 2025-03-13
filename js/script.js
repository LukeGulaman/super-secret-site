const root = document.querySelector(":root");
const timeText = document.getElementById("time");
const heartTick = document.getElementById("heartTick");

const anniversaryDate = new Date("2025-03-13T19:01:00");
const startOfFile = new Date("2024-12-05T09:17:00");

const oneDay = 24*60*60*1000;

function changeTime(startDate, endDate) {
    let diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    let mm = 0;
    let w = 0;
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    
    while(diff > 1) {
        if (diff > 2.628e+9) { // months
            mm++; diff -= 2.628e+9;
            continue;
        }
        if (diff > 6.048e+8) { // weeks
            w++; diff -= 6.048e+8;
            continue;
        }
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

    timeText.textContent = `${mm} months, ${w} weeks, ${d} days, ${h} hours, ${m} minutes, ${s} seconds left`
}
function timePercentage(startDate, currentDate, endDate) {
    const startTime = new Date(startDate).getTime();
    const sp1 = new Date(endDate).getTime() - startTime;
    const sp2 = new Date(currentDate).getTime() - startTime;

    return Math.round(sp2/sp1*10000)/100;
}

changeTime(new Date(), anniversaryDate);

setTimeout(() => {
    // synced clock
    heartTick.style.animation = "1s rotateGradient infinite linear";
    setInterval(() => {
        const date = new Date();
        timeLeft = timePercentage(startOfFile, date, anniversaryDate);
        root.style.setProperty("--degree", `${(360 * (timeLeft / 100)).toFixed(2)}deg`);

        changeTime(date, anniversaryDate);
        document.title = `${Math.round(Math.abs((date - anniversaryDate) / oneDay))} days left :3`;
    }, 1000)
}, 1000 - new Date().getMilliseconds());