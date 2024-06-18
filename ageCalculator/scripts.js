let dayInput = document.getElementById('dayInput')
let monthInput = document.getElementById('monthInput')
let yearInput = document.getElementById('yearInput')

let displayDay = document.getElementById('day')
let displayMonth = document.getElementById('month')
let displayYear = document.getElementById('year')
let displayError = document.getElementById('errorMessage')


let now = new Date();
let today = now.getDate();
let thisMonth = now.getMonth();
let thisYear = now.getFullYear();

function showage() {
    let inputDays = Number(dayInput.value);
    let inputMonths = Number(monthInput.value) - 1;
    let inputYears = Number(yearInput.value);

    if (inputDays > 31 || inputMonths > 12 || inputYears > 2024) {
        displayError.innerHTML = "Invalid Date";
        setTimeout(function () {
            displayError.innerHTML = '';
            dayInput.value = 2;
            monthInput.value = 6;
            yearInput.value = 2001;

        }, 1000)


        return;



    }

    let outputDay = 0;
    let outputMonth = 0;
    let outputYear = 0;


    if (today < inputDays) {
        today = today + 31;
        thisMonth = thisMonth - 1;
    }
    outputDay = today - inputDays
    if (outputDay > 31) {
        outputDay = outputDay - 31;
        outputMonth++;
    }
    displayDay.innerHTML = ` ${outputDay} days`;

    if (thisMonth < inputMonths) {
        thisMonth = thisMonth + 12;
        thisYear = thisYear - 1;
    }

    outputMonth = thisMonth - inputMonths;
    outputYear = thisYear - inputYears;
    if (outputMonth > 12) {
        outputMonth = outputMonth - 12;
        outputYear++;
    }


    displayMonth.innerHTML = ` ${outputMonth} Months`;
    displayYear.innerHTML = ` ${outputYear} Years`;
}


window.addEventListener("input", showage)