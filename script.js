
//dom elements

let form = document.querySelector('form')
let todoInput = document.getElementById('todo')
let list = document.getElementById('list')
console.log('list', list)
let tasksCompleted = document.getElementById('completed-tasks')


//event listeners
form.addEventListener('submit', addTodo)
list.addEventListener('click', completedTodo)
document.getElementById('completed-btn').addEventListener('click', completeT)

function addTodo(e) {
    e.preventDefault()
    let text = todoInput.value
    if (text === "") {
        createAlert('Text cannot be empty', 'red')
    }

    //create li
    let li = document.createElement('li')
    li.className = 'todo-collection'
    //createtext node and append to li
    li.appendChild(document.createTextNode(text))
    //li.innerHTML = text

    //create new link elemet
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'

    //add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>'

    //append link to li
    li.appendChild(link)
    list.appendChild(li)

    // clear text input
    todoInput.value = ""
}


function createAlert(msg, color) {
    let div = document.createElement('div')
    div.className = 'alerts'
    div.appendChild(document.createTextNode(msg))
    //div.innerHTML = msg
    div.style.backgroundColor = color
    // add div to the dom
    let container = document.querySelector('.container')
    container.insertBefore(div, form)
}

setTimeout(function () {
    const alert = document.querySelector('div.alerts')
    console.log('alert', alert)
    alert.remove()
}, 3000)


//

function completedTodo(e) {
    console.log('e', e.target)
    if (e.target.className === 'todo-collection') {
        e.target.classList.add('completed')
    }


}

function completeT() {
    let newT = Array.from(list.children)
    let completedTasks = newT.filter(item => {
        console.log('item', item)
        return item.classList.contains('completed')

    })

    let numberOfCompletedTasks = completedTasks.length
    tasksCompleted.innerHTML = `<p>Number of tasks completed is ${numberOfCompletedTasks}</p>`

}