
//dom elements

let form = document.querySelector('form')
let todoInput = document.getElementById('todo')
let list = document.getElementById('list')
let tasksCompleted = document.getElementById('completed-tasks')



//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
form.addEventListener('submit', addTodo)
list.addEventListener('click', completedTodo)
list.addEventListener('click', deleteTodo)
document.getElementById('completed-btn').addEventListener('click', completeT)

function addTodo(e) {
    e.preventDefault()
    let text = todoInput.value
    if (text === "") {
        createAlert('Text cannot be empty', 'red')
        return
    }

    //create li
    let li = document.createElement('li')
    li.className = 'todo-collection'
    //createtext node and append to li
    li.innerText = text

    //create new link elemet
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'

    //add icon html
    //link.innerHTML = '<i class= "fa fa-remove"></i> '
    link.innerHTML = '<i class="fa-solid fa-trash"></i>'

    // create completed button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = `<i class ="fas fa-check"></i>`
    completedButton.classList.add("complete-btn")
    li.appendChild(completedButton)


    //append link to li
    li.appendChild(link)

    list.appendChild(li)

    storeTodoInLocalStorage(todoInput.value)

    // clear text input
    todoInput.value = ""
}


function createAlert(msg, color) {
    let msgDiv = document.createElement('div')
    msgDiv.className = 'alert'
    msgDiv.appendChild(document.createTextNode(msg))
    //div.innerHTML = msg
    msgDiv.style.backgroundColor = color
    // add div to the dom
    let container = document.querySelector('.container')
    let heading = document.querySelector('.heading')

    //insert alert after heading
    container.insertBefore(msgDiv, heading)
}

// setTimeout(function () {
//      document.querySelector('.alert').remove()
// }, 3000)

setTimeout(clearAlert, 7000)

function clearAlert() {
    document.querySelector('.alert').remove()

}


//mark todo as complete

function completedTodo(e) {
    console.log('e', e.target)
    console.log('parent', e.target.parentElement.parentElement)
    if (e.target.classList.contains('fa-check')) {
        e.target.parentElement.parentElement.classList.toggle('completed')

        if (e.target.parentElement.parentElement.className === 'todo-collection completed') {
            document.getElementById('completed-btn').style.display = 'block'
        } else {
            document.getElementById('completed-btn').style.display = 'none'
        }
    }

}




// counT number of completed todos
function completeT() {
    let newTaskList = Array.from(list.children)
    let completedTasks = newTaskList.filter(item => {
        console.log('item', item)
        return item.classList.contains('completed')

    })

    let numberOfCompletedTasks = completedTasks.length

    let completed = document.createElement('p')
    completed.className = 'completed-task'
    completed.innerText = `Number of tasks completed is ${numberOfCompletedTasks}`
    tasksCompleted.appendChild(completed)

}


setTimeout(clearCompletedTasks, 7000)

function clearCompletedTasks() {
    document.querySelector('.completed-task').remove()

}

// delete todos

function deleteTodo(e) {
    if (e.target.classList.contains('fa-trash')) {
        e.target.parentElement.parentElement.remove()
        createAlert('Todo removed', 'red')

    }


}


//store todo in local storage

function storeTodoInLocalStorage(todo) {
    let todos;
    //check locaal storage if there is any todo in there
    if (localStorage.getItem('todos') === null) {
        todos = []

    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
}


//get todoss from local storage

function getTodos() {
    let todos;
    //check locaal storage if there is any task in ther
    if (localStorage.getItem('todos') === null) {
        todos = []

    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        let li = document.createElement('li')
        li.className = 'todo-collection'
        //createtext node and append to li
        li.appendChild(document.createTextNode(todo))
        //li.innerHTML = text

        //create new link elemet
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'

        //add icon html
        link.innerHTML = '<i class="fa-solid fa-trash"></i>'

        // create completed button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = `<i class ="fas fa-check"></i>`
        completedButton.classList.add("complete-btn")
        li.appendChild(completedButton)

        //append link to li
        li.appendChild(link)
        list.appendChild(li)


    })

}
