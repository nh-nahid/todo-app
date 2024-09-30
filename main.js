import './style.css'
import 'boxicons'

const container = document.querySelector('.container')
const toDoForm = document.querySelector('form')
const input = document.querySelector('input')
const btn = document.querySelector('button')
const ul = document.querySelector('ul')
const msg = document.querySelector('.msg')
const clear = document.querySelector('.clear')

// ShowMsg
const showMsg = (text, status) => {
  msg.textContent = text;
  msg.classList.add(`msg-${status}`);

  setTimeout(() => {
    msg.textContent = "";
    msg.classList.remove(`msg-${status}`)
  }, 1500)
}

clear.addEventListener('click', function(){
  ul.innerHTML = ""

  showMsg("All item has been removed", "all-remove")

})


const createList = (uniqueId, finalText) =>{

  if(finalText !== ""){
    showMsg('Item has been added', 'success')
    const toDoList = document.createElement("li");
    toDoList.classList.add('list-style')
    toDoList.id = uniqueId;
  
     /*html*/
    toDoList.innerHTML = `
      <span>${finalText}</span>
      <span><button class="trash" id="deleteButton"><i class="fa-solid fa-trash"></i></button></span>
  
    `
    ul.appendChild(toDoList)

    
  // Delete ToDo
const deleteButton = toDoList.querySelector('.trash')
deleteButton.addEventListener('click', function(event){
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
     ul.removeChild(selectedTodo)
     showMsg("Item has been deleted", "warning")

     let todos = getTodoFromLocalStorage();
     todos = todos.filter((todo) => todo.uniqueId !== selectedTodo.id)
  localStorage.setItem("myTodos", JSON.stringify(todos));

})

  } else{
    showMsg('Please input a value', 'no-input')
    
  }


  // Remove ul

 

  // Add todo to Local Storage
  const todos = getTodoFromLocalStorage()
  todos.push({uniqueId, finalText});
  localStorage.setItem("myTodos", JSON.stringify(todos));

  finalText = ""
}


// Get todos From Local Storage
const getTodoFromLocalStorage = () => {
  return localStorage.getItem("myTodos") ? JSON.parse(localStorage.getItem("myTodos")) : [];
}


btn.addEventListener('click', function(event){
  event.preventDefault();
  const value = (input.value);
  const finalText = value.charAt(0).toUpperCase() + value.slice(1)
  
  // Unique id
const uniqueId = Date.now().toString();

createList(uniqueId, finalText)
})


// DOM Load
const todoLoad = () => {
  const todos = getTodoFromLocalStorage();
  todos.map((todo) => {
    createList(todo.uniqueId, todo.finalText)
  })
}

