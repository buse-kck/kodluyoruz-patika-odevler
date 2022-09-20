const taskInput = document.querySelector('#task');
const button = document.querySelector('#liveToastBtn');
const list = document.querySelector('#list');
const containerDiv = document.querySelector('.container');


eventListeners();

function eventListeners(){
    button.addEventListener('click', addTodo);
    document.addEventListener('DOMContentLoaded', loadAllTodos);
    containerDiv.addEventListener('click', deleteItem);
    taskInput.addEventListener('keypress', enterAdd);
}


function addTodo(){
    
    const newTodo = taskInput.value.trim();
//  console.log(newTodo);
    let todos = getTodosFromStorage();
    
    if(newTodo === ''){
     
        showAlert('warning','Lütfen bir todo giriniz..');
    }
    else if(todos.indexOf(newTodo) === -1){
      
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert('success', 'Todo başarıyla eklendi.');
    }
    else if(todos.indexOf(newTodo === 1)){
     
        showAlert('danger','Bu todo zaten ekli..');
    }
}

function enterAdd(e){
   
  if(e.key === 'Enter'){
     addTodo();
  }
}



  function getTodosFromStorage(){      
    let todos;
    
    if(localStorage.getItem('todos') === null){
        
        todos = [];
    }
    else{
       
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}


function showAlert(type,message){

//     <div class="alert alert-warning alert-dismissible fade show" role="alert">
//     <strong>Holy guacamole!</strong> You should check in on some of those fields below.
//     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//       <span aria-hidden="true">&times;</span>
//     </button>
//   </div>

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close';
    closeButton.dataDismiss = 'alert';
    closeButton.ariaLabel = 'Close';
    const span = document.createElement('span');
    span.ariaHidden = 'true';
    span.innerHTML = '&times';
    closeButton.appendChild(span);
    alert.append(document.createTextNode(message));
    alert.append(closeButton);
    alert.style.position = 'absolute';
    alert.style.top = '20px';
    alert.style.right = '20px';

    document.body.append(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 2000);
}



function addTodoToUI(newTodo){
  
  const li = document.createElement('li');
  li.className = "list-group-item d-flex justify-content-between";
  li.appendChild(document.createTextNode(newTodo));
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  li.append(link);
  list.appendChild(li);
  
  taskInput.value = '';

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    
    if(todos.indexOf(newTodo) === -1){
        
        todos.push(newTodo);
    }
    
    localStorage.setItem('todos',JSON.stringify(todos));
}

function deleteItem(e){
   if(e.target.className === 'fa fa-remove'){
     
    e.target.parentElement.parentElement.remove();

      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
      showAlert('info','Başarıyla silindi.');
   
    }
}

function deleteTodoFromStorage(deletedTodo){
    
   let todos = getTodosFromStorage();
   todos.forEach(function(todo,index) {
     if(todo === deletedTodo)
     todos.splice(index,1);
   })
   localStorage.setItem('todos',JSON.stringify(todos));
}

function loadAllTodos(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
    
}
