const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check')

const richestPeople = [
    'Family',
    'Nation',
    'Carrier',
    'Relationships',
    'Friends',
    'Money',
    'Material Prosperity',
    'Recognition',
    'Sports',
    'Hobbies and interest'
];

const listItems = [];

let dragStartIndex;

createList()

function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            // console.log(person)
            const listItem = document.createElement('li')
            listItem.setAttribute('data-index', index)

            listItem.innerHTML = `<span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
               <p class="person-name">${person}</p>
               <i class="fas fa-grip-lines"></i>
            </div>`;

            listItems.push(listItem)

            draggable_list.appendChild(listItem)
        })

    addEventListener();
}

function dragStart() {
    console.log("Event:", "dragstart")
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex)
}

function dragEnter() {
    // console.log("Event:", "dragenter")
    this.classList.add('over')

}



function dragDrop() {
    // console.log("Event:", "dragdrop")
    const dragEndIndex = this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log("Event:", "dragover")
    e.preventDefault()
}

function dragLeave() {
    // console.log("Event:", "dragleave")
    this.classList.remove('over')

}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)


}

function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable')
            .innerText.trim();

        if (personName !== richestPeople[index]) {
            item.classList.add('wrong')
        } else {
            item.classList.remove('wrong')

            item.classList.add('right')
        }
    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItem = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    })

    dragListItem.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)

    })

}

check.addEventListener('click', checkOrder)