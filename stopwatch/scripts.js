let stopBtn = document.getElementById('stopBtn')
let startBtn = document.getElementById('startBtn')
let resetBtn = document.getElementById('resetBtn')
let display = document.querySelector('.timerDisplay')

let msec = 00;
let sec = 00;
let min = 00;

let timerid = null;





startBtn.addEventListener("click", function () {
    if (timerid !== null) {
        clearInterval(timerid)
    }
    console.log("clicked")
    timerid = setInterval(startTimer, 10)

})

resetBtn.addEventListener('click', function () {
    clearInterval(timerid);
    display.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 00;
});

stopBtn.addEventListener("click", function () {
    clearInterval(timerid)
})


function startTimer() {
    msec++
    if (msec == 100) {
        msec = 0;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++
        }
    }
    let msecString = msec < 10 ? `0${msec}` : `${msec}`;
    let secString = sec < 10 ? `0${sec}` : `${sec}`;
    let minString = min < 10 ? `0${min}` : `${min}`;

    display.innerHTML = `${minString} : ${secString} : ${msecString}`;

}