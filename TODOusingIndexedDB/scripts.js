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


function addNote() {
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
    task.status = 'complete'
    tasks = tasks.filter(task => task.task !== taskName);
    console.log(task)
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}





// // inputGroup.forEach(item => item.addEventListener('input', function (e) {
// //     console.log(typeof (e.target.value))
// // }))

// // create a instance of db

// let db;

// const openRequest = window.indexedDB.open('tasks_db', 1);
// openRequest.addEventListener("error", () => {
//     console.error('Database failed to open')
// })

// openRequest.addEventListener('success', () => {
//     console.log('Database opened successfully')
//     db = openRequest.result;
//     displayData();
// })





// openRequest.addEventListener('upgradeneeded', e => {
//     db = e.target.result;

//     const objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
//     objectStore.createIndex('task', 'task', { unique: false });
//     objectStore.createIndex('startDate', 'startingDate', { unique: false });
//     objectStore.createIndex('endDate', 'endDate', { unique: false });

//     console.log('Database setup complete');

// })

// submitBtn.addEventListener('click', addData);


// function addData(e) {
//     e.preventDefault();
//     const newTask = { task: taskInput.value, startDate: startingDateInput.value, endDate: endDateInput.value };
//     const transaction = db.transaction(['tasks'], 'readwrite');
//     const objectStore = transaction.objectStore('tasks');
//     const addRequest = objectStore.add(newTask)

//     addRequest.addEventListener('success', () => {
//         // Clear the form, ready for adding the next entry
//         titleInput.value = '';
//         bodyInput.value = '';
//     });

//     transaction.addEventListener('complete', () => {
//         console.log('Transaction completed: database modification finished.');

//         // update the display of data to show the newly added item, by running displayData() again.
//         displayData();
//     });

//     transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));

// }

// function displayData() {
//     while (list.firstChild) {
//         list.removeChild(list.firstChild)
//     }
//     const objectStore = db.transaction('tasks').objectStore('tasks');
//     objectStore.openCurser().addEventListener('success', e => {
//         const cursor = e.target.result;

//         if (cursor) {
//             const task = cursor.value;
//             const taskElement = createTaskElement(task);
//             tasksContainer.appendChild(taskElement);
//             cursor.continue();
//         }
//     })
// }

// function createTaskElement(task) {
//     const taskDiv = document.createElement('div');
//     taskDiv.className = 'task';
//     taskDiv.setAttribute('data-task-id', task.id);

//     taskDiv.innerHTML = `
//         <div class="taskHeader">
//             <h2 class="taskTitle">${task.task}</h2>
//             <button class="dropDownBtn"><i class="fa-solid fa-caret-down"></i></button>
//         </div>
//         <div class="taskInfo">
//             <div class="date">
//                 <p>Starting Date <span class="startingDate">${task.startDate}</span></p>
//                 <p>Last Date <span class="endDate">${task.endDate}</span></p>
//             </div>
//             <div class="taskDetails">
//                 <p>STATUS <span class="status">Pending</span></p>
//                 <div class="importantBox">
//                     <label for="important">IMPORTANT</label>
//                     <input type="checkbox">
//                 </div>
//                 <button class="deleteBtn">DELETE TASK</button>
//             </div>
//         </div>
//     `;

//     taskDiv.querySelector('.dropDownBtn').addEventListener('click', () => {
//         taskDiv.querySelector('.taskInfo').classList.toggle('show');
//     });

//     taskDiv.querySelector('.deleteBtn').addEventListener('click', () => {
//         deleteTask(task.id);
//     });

//     return taskDiv;
// }

// function deleteTask(taskId) {
//     const transaction = db.transaction(['tasks_os'], 'readwrite');
//     const objectStore = transaction.objectStore('tasks_os');
//     objectStore.delete(taskId).addEventListener('success', () => {
//         console.log(`Task ${taskId} deleted.`);
//         displayTasks();
//     });
// }


// let dropDownButton = document.querySelector(".dropDownBtn");
// let newTaskBtn = document.querySelector(".addTaskBtn");
// let taskInput = document.querySelector(".taskInput");
// let startingDateInput = document.querySelector(".startingDate");
// let endDateInput = document.querySelector(".endDate");
// let submitBtn = document.querySelector('.addBtn');
// const list = document.querySelector('.displayBox');

// let taskInfo = document.querySelector(".taskInfo");
// let newForm = document.querySelector(".newForm");

// console.log(dropDownButton);

// function showTask() {
//     taskInfo.classList.toggle('show');
// }

// function showTaskForm() {
//     newForm.classList.toggle('show');
// }

// dropDownButton.addEventListener("click", showTask);
// newTaskBtn.addEventListener("click", showTaskForm);

// Create a instance of db
// let db;

// const openRequest = window.indexedDB.open('tasks_db', 1);

// openRequest.addEventListener("error", () => {
//     console.error('Database failed to open');
// });

// openRequest.addEventListener('success', () => {
//     console.log('Database opened successfully');
//     db = openRequest.result;
//     displayData();
// });

// openRequest.addEventListener('upgradeneeded', e => {
//     db = e.target.result;
//     const objectStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
//     objectStore.createIndex('task', 'task', { unique: false });
//     objectStore.createIndex('startDate', 'startDate', { unique: false });
//     objectStore.createIndex('endDate', 'endDate', { unique: false });

//     console.log('Database setup complete');
// });

// submitBtn.addEventListener('click', addData);

// function addData(e) {
//     e.preventDefault();
//     const newTask = { task: taskInput.value, startDate: startingDateInput.value, endDate: endDateInput.value };
//     const transaction = db.transaction(['tasks'], 'readwrite');
//     const objectStore = transaction.objectStore('tasks');
//     const addRequest = objectStore.add(newTask);

//     addRequest.addEventListener('success', () => {
//         // Clear the form, ready for adding the next entry
//         taskInput.value = '';
//         startingDateInput.value = '';
//         endDateInput.value = '';
//     });

//     transaction.addEventListener('complete', () => {
//         console.log('Transaction completed: database modification finished.');
//         displayData();
//     });

//     transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
// }

// function displayData() {
//     while (list.firstChild) {
//         list.removeChild(list.firstChild);
//     }
//     const objectStore = db.transaction('tasks').objectStore('tasks');
//     objectStore.openCursor().addEventListener('success', e => {
//         const cursor = e.target.result;
//         if (cursor) {
//             const task = cursor.value;
//             const taskElement = createTaskElement(task);
//             list.appendChild(taskElement);
//             cursor.continue();
//         }
//     });
// }

// function createTaskElement(task) {
//     const taskDiv = document.createElement('div');
//     taskDiv.className = 'task';
//     taskDiv.setAttribute('data-task-id', task.id);

//     taskDiv.innerHTML = `
//         <div class="taskHeader">
//             <h2 class="taskTitle">${task.task}</h2>
//             <button class="dropDownBtn"><i class="fa-solid fa-caret-down"></i></button>
//         </div>
//         <div class="taskInfo">
//             <div class="date">
//                 <p>Starting Date <span class="startingDate">${task.startDate}</span></p>
//                 <p>Last Date <span class="endDate">${task.endDate}</span></p>
//             </div>
//             <div class="taskDetails">
//                 <p>STATUS <span class="status">Pending</span></p>
//                 <div class="importantBox">
//                     <label for="important">IMPORTANT</label>
//                     <input type="checkbox">
//                 </div>
//                 <button class="deleteBtn">DELETE TASK</button>
//             </div>
//         </div>
//     `;

//     taskDiv.querySelector('.dropDownBtn').addEventListener('click', () => {
//         taskDiv.querySelector('.taskInfo').classList.toggle('show');
//     });

//     taskDiv.querySelector('.deleteBtn').addEventListener('click', () => {
//         deleteTask(task.id);
//     });

//     return taskDiv;
// }

// function deleteTask(taskId) {
//     const transaction = db.transaction(['tasks'], 'readwrite');
//     const objectStore = transaction.objectStore('tasks');
//     objectStore.delete(taskId).addEventListener('success', () => {
//         console.log(`Task ${taskId} deleted.`);
//         displayData();
//     });
// }