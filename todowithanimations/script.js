
const form = document.querySelector('.submit')
const todoInput = document.querySelector('.text')
const todoList = document.querySelector('.list-items')
const completedTodos = document.querySelector('.number_completed')
const error = document.querySelector('.error')


// event listeners
form.addEventListener('submit', addTodo)
todoList.addEventListener('click', removeTodo)
todoList.addEventListener('click', toggleCompleted)


//functions
function addTodo(e) {
    error.classList.remove('active')
    e.preventDefault()
    let todo = todoInput.value
    if (todo === "") {

        setTimeout(() => {
            error.classList.add('active')
        }, 20)
        return
    }
    let todoEl = document.createElement('li')
    todoEl.className = 'todo-collection'
    //create span element
    let spanEl = document.createElement('span')
    spanEl.innerText = todo
    //append the span element to the li
    todoEl.appendChild(spanEl)
    // create toggle button
    const toggleButton = document.createElement('button')
    toggleButton.innerHTML = `<i class ="fas fa-check"></i>`

    // createtrash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

    todoEl.appendChild(toggleButton)
    todoEl.appendChild(trashButton)

    todoList.appendChild(todoEl)

    todoInput.value = ""

}



function removeTodo(e) {
    if (e.target.classList.contains('fa-trash')) {
        e.target.parentElement.parentElement.remove()
    }
    updateCompleted()

}

function toggleCompleted(e) {
    if (e.target.classList.contains('fa-check')) {
        e.target.parentElement.parentElement.classList.toggle('completed')
        updateCompleted()
    }
}


//updateCompleted todos
function updateCompleted() {
    let completed = 0
    let todoNodeList = Array.from(todoList.children)
    todoNodeList.find(todo => {
        let completedTodo = todo.classList.contains('completed')
        console.log('todo', completedTodo)
        if (completedTodo) {
            completed++
            completedTodos.innerText = `${completed} completed`
        } else {
            completed--
            return
        }
    })

}



