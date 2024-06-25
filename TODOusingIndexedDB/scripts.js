let dropDownButton = document.querySelector(".dropDownBtn");
let newTaskBtn = document.querySelector(".addTaskBtn");
let taskInput = document.querySelector(".taskInput")
let startingDateInput = document.getElementById("startingDate")
let endDateInput = document.getElementById("lastDate")
let submitBtn = document.querySelector('.addBtn')
let deleteBtn = document.querySelectorAll('.deleteBtn')

let displayList = document.querySelector('.displayBox')


let taskInfo = document.querySelector(".taskInfo")
let newForm = document.querySelector(".newForm")

document.addEventListener("DOMContentLoaded", loadTasks)

console.log(dropDownButton)

// function showTask() {
//     taskInfo.classList.toggle('show')
// }

function showTaskForm() {
    newForm.classList.toggle('show')
}
// dropDownButton.addEventListener("click", showTask)
newTaskBtn.addEventListener("click", showTaskForm)

function getStatus(startingDate, endDate) {

    const now = new Date()
    const today = now.getDate()
    // console.log(today)
    const thisMonth = now.getMonth() + 1
    // console.log(thisMonth)
    const startArr = startingDate.split("-")
    const startMonth = Number(startArr[1])
    const startDay = Number(startArr[2])
    // console.log(startMonth)
    // console.log(startDay)
    const endArr = endDate.split("-")
    const endMonth = Number(endArr[1])
    const endDay = Number(endArr[2])
    // console.log(endMonth)
    // console.log(endDay)

    if (thisMonth >= startMonth && thisMonth <= endMonth) {
        if (today >= startDay && today <= endDay) {
            console.log("the status is active now")

            return 'active';

        }
    }
    if (thisMonth < startMonth) {
        console.log("upcoming")

        return 'upcoming'

    }
    if (thisMonth >= endMonth && today > endDay) {
        console.log("the status is pending now")

        return 'pending'
    } else {
        console.log("upcoming")
        return 'upcoming'
    }

}


function addNote(event) {
    let status;
    if (taskInput.value == '' || startingDateInput.value == '' || endDateInput.value == '') {
        alert("invalid input")
        return
    }

    event.preventDefault();
    console.log('addbutton waas clicked')
    // console.log(typeof (taskInput.value))
    // console.log(typeof (startingDateInput.value))
    // console.log(typeof (endDateInput.value))

    status = getStatus(startingDateInput.value, endDateInput.value)





    let task = {
        task: taskInput.value,
        status: status,

        startDate: startingDateInput.value,
        endDate: endDateInput.value,


    }
    saveTaskToLocalStorage(task);
    // console.log(task)
    let elementToAdd = createTaskElement(task)
    // console.log(elementToAdd)
    displayList.appendChild(elementToAdd)
    // console.log(displayList)
    startingDateInput.value = '';
    endDateInput.value = '';
    taskInput.value = ''


}

function createTaskElement(task) {

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    const isChecked = task.status === 'complete' ? 'checked' : '';







    taskDiv.innerHTML = `
            <div class="taskHeader">
                <h2 class="taskTitle">${task.task}</h2>
                <p class="hl show"> <br>${task.status}</p>
                <button class="dropDownBtn"><i class="fa-solid fa-caret-down"></i></button>
            </div>
            <div class="taskInfo">
                <div class="date">
                    <p>Starting Date <span class="startingDate">${task.startDate}</span></p>
                    <p>Last Date <span class="endDate">${task.endDate}</span></p>
                </div>
                <div class="taskDetails">
                    <p class = "state">STATUS <span class="status">${task.status}</span></p>
                    <div class="importantBox">
                        <label for="important">Complete</label>
                        <input class="important" type="checkbox" ${isChecked} >
                    </div>
                    <button class="deleteBtn">DELETE</button>
                </div>
            </div>
        `;



    taskDiv.querySelector('.dropDownBtn').addEventListener('click', () => {

        taskDiv.querySelector('.taskInfo').classList.toggle('show');
        taskDiv.querySelector('.dropDownBtn').classList.toggle('move');
        taskDiv.querySelector('.hl').classList.toggle('show');



    });

    taskDiv.querySelector('.deleteBtn').addEventListener('click', () => {
        deleteFromLocalStorage(task.task);
        taskDiv.remove();
    })

    taskDiv.querySelector('.important').addEventListener('click', () => {
        console.log("double clicked")

        if (taskDiv.querySelector('.status').innerHTML === 'complete') {
            let reVokedstatus = getStatus(task.startDate, task.endDate)
            console.log(`status from change status ${reVokedstatus}`)
            taskDiv.querySelector('.status').innerHTML = reVokedstatus;
            taskDiv.querySelector('.hl').innerHTML = reVokedstatus

            updateLocalStorage(task.task)
            return;
        }
        // let askUser = confirm('Once you change status it cant be changed again. Do you want to continue?');

        // if (askUser) {


        // } else {



        //     return
        // }
        updateLocalStorage(task.task);
        console.log(taskDiv.querySelector('.status').innerHTML)
        taskDiv.querySelector('.status').innerHTML = 'complete'
        taskDiv.querySelector('.hl').innerHTML = 'complete'





    })





    return taskDiv;
}

function deleteNode(e) {
    console.log(e.target.closest('.task'))
    let elementToDelete = e.target.closest('.task');
    console.log(elementToDelete)
    displayList.removeChild(elementToDelete)
}

deleteBtn.forEach(btn => {
    btn.addEventListener('click', deleteNode)
})

submitBtn.addEventListener("click", addNote)


function saveTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];


    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(task => {
        const elementToAdd = createTaskElement(task)
        displayList.appendChild(elementToAdd)
    })
}

function deleteFromLocalStorage(taskName) {
    console.log('in the delete from local storage')
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks = tasks.filter(task => task.task !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function updateLocalStorage(taskName) {
    console.log('in the update from local storage')
    let tasks;
    let task;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    task = tasks.find(task => task.task === taskName)
    if (task.status === "complete") {
        const status = getStatus(task.startDate, task.endDate)
        task.status = status;
    } else {
        task.status = 'complete'
    }

    tasks = tasks.filter(task => task.task !== taskName);
    console.log(task)
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

let styleContainer = document.querySelector('.mainHeader')
let shadowShower = document.querySelector('.showShadow')
const walk = 100;

function showShadow(e) {
    const { offsetWidth: width, offsetHeight: height } = styleContainer;
    let { offsetX: x, offsetY: y } = e

    if (this !== e.target) {
        console.log(e.target.offsetLeft)
        x = x + e.target.offsetLeft;
        console.log(e.target.offsetTop)

        y = y + e.target.offsetTop;
        console.log("inside")

    }
    console.log(`the value of x now is ${x}`)
    console.log(`the value of x now is ${y}`)




    const walkx = Math.round((x / width) * walk - (walk / 2))
    const walky = Math.round((y / height) * walk - (walk / 2))
    console.log(`the value of walkx is ${walkx}`)
    console.log(`the value of walky is ${walky}`)


    shadowShower.style.textShadow = `
      ${walkx}px  ${walky}px  0 rgba(0,0,0,0.7),
            ${walky}px  ${walkx}px  0 rgba(0,255,0,0.7),
                        ${walky * -1}px  ${walkx}px  0 rgba(0,255,255,0.7),
                                    ${walky * -2}px  ${walkx * -1}px  0 rgba(255,255,0,0.7)




    `;





}

function notShowShadow() {
    console.log("outside")
    shadowShower.style.textShadow = 'none';
    // shadowShower.style.textShadow = `
    //    1px 1px 0 rbg(255,255,255),
    // `;

}
styleContainer.addEventListener("mouseover", showShadow)
styleContainer.addEventListener("mouseout", notShowShadow)