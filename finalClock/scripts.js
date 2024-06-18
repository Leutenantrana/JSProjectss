let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let audio = document.getElementById('aud')
let audio1 = document.getElementById('aud1')
let audio2 = document.getElementById('aud2')



function playAudioTimes() {
    audio2.currentTime = 0;
    audio2.play();
}

function displayTime() {
    let now = new Date();

    let hh = now.getHours();

    let mm = now.getMinutes();
    let ss = now.getSeconds();


    let hRotation = 30 * hh + mm / 2;
    let mRotation = 6 * mm;
    let sRotation = 6 * ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;


    if (Number(mm) == 0 && Number(ss) == 0) {
        if (hh > 12) {
            hh = hh - 12;
        }
        playAudioTimes(); // Play the audio as many times as the current hour
    }

}


setInterval(displayTime, 1000);