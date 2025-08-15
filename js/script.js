// extracting the elements from the page 
const inputTask = document.querySelector('input')
const buttonTask = document.querySelector('.todobox__row-button')

const tasksList = document.querySelector('.tasks__list');

// logic of to-do list
function parseDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

let tasks = [

]
function getEmptyList() {
    return `
            <div class="tasks__list-empty">
                <span class = "tasks__list-noitems">The to-do list is empty...</span>
                <img src="img/cherry-tree.png" alt="" class="tasks__list-noitems-img">
            </div>
    `
}
function getNoteTemplate(tasks, index) {
    return `
            <li class = "${tasks.completed === false ? 'tasks__list-item' : 'tasks__list-item tasks__list-item-completed'}"> 
                <span class="${tasks.completed === false ? 'tasks__list-item-name' : 'tasks__list-item-name tasks__list-item-name-completed'}">${tasks.taskname}</span>
                <span class="${tasks.completed === false ? 'tasks__list-item-date' : 'tasks__list-item-date tasks__list-item-date-completed'}">${tasks.taskdate}</span>
                <div class="tasks__list-item_buttons">
                    <img src="img/icons/check.png" data-index = "${index}" data-type = "toggle" alt="" class="${tasks.completed === false ? 'tasks__list-item_buttons_check' : ' tasks__list-item_buttons_check tasks__list-item_buttons_check-completed'}">
                    <img src="img/icons/delete.png" data-index = "${index}" data-type = "remove" alt="" class="${tasks.completed === false ? 'tasks__list-item_buttons_delete' : ' tasks__list-item_buttons_delete tasks__list-item_buttons_delete-completed'}">
                </div>
            </li>
    `
}

function render() {
    tasksList.innerHTML = '';
    if (tasks.length === 0){
        tasksList.insertAdjacentHTML('beforeend', getEmptyList());
    } else {
        for (let i = 0; i < tasks.length; i++){
            tasksList.insertAdjacentHTML('beforeend', getNoteTemplate(tasks[i], i));
        }
    }
}
render();

function addTask() {
    buttonTask.addEventListener('click', () => {
        if (inputTask.value === '') {
            alert("Write something in inputbox :)")
            return
        }
        const newTask = {
            taskname: inputTask.value,
            taskdate: parseDate(),
            completed: false
        }
        tasks.push(newTask);
        render();                      
        inputTask.value = "";
    })
}   
addTask();

function taskButtonsListeners() {
    tasksList.addEventListener('click', (event) => {
        if(event.target.dataset.index) {
            const index = parseInt(event.target.dataset.index);
            const type = event.target.dataset.type;

            if (type === "toggle"){
                tasks[index].completed = !tasks[index].completed;
            } else if (type === "remove") {
                tasks.splice(index, 1);
            }

            render();
        }
    })
}

taskButtonsListeners()