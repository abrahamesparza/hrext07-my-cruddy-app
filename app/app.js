/*
Init app
interact with DOM
interact with localstorage
 */
var todoList = {
  todos: [],
  displayTodos: function() {
    if(this.todos.length === 0) {
      console.log('Your list is empty friend!');
    }
    else {
     console.log('Todos:');
     for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i].completed === true) {
        console.log('(√)', this.todos[i].todoText);
      }
      else {
        console.log('( )', this.todos[i].todoText);
      }
     }
    }
  },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  modifyTodo: function(pos, todoText) {
    this.todos[pos].todoText = todoText;
  },
  deleteTodo: function(pos) {
    this.todos.splice(pos, 1);
  },
  toggleCompleted: function(pos) {
    var todo = this.todos[pos];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var total = this.todos.length;
    var completed = 0;
    for(let i = 0; i < total; i++) {
      if(this.todos[i].completed === true) {
        completed++;
      }
    }
      if(completed === total) {
      for(let i = 0; i < total; i++) {
        this.todos[i].completed = false;
    }
  }
  else {
    for(let i = 0; i < total; i++) {
      this.todos[i].completed = true;
    }
  }
 }
};

var handler = {
 addTodo: function() {
  var addInput = document.getElementById('addTask');
    todoList.addTodo(addInput.value);
    const keyInput = addInput.value;
    const valInput = addInput.value;

    if(keyInput && valInput) {
      localStorage.setItem(keyInput, valInput);
    }
    //localStorage.getItem(keyInput, valInput)

    addInput.value = '';
    listTodos.displayTodos();
 },
 modifyTodo: function() {
  var modifyPos = document.getElementById('modifyPosition');
  var modifyInput = document.getElementById('modifyTask')
    todoList.modifyTodo(modifyPos.valueAsNumber, modifyInput.value);
    modifyPos.value = '';
    modifyInput.value = '';
    listTodos.displayTodos();
  },
  deleteTodo: function(pos) {
    todoList.deleteTodo(pos);
    listTodos.displayTodos();
  },
 toggleCompleted: function() {
  var toggle = document.getElementById('toggleInput');
  todoList.toggleCompleted(toggle.valueAsNumber);
  toggle.value = '';
  listTodos.displayTodos();
 },
 toggleAll: function() {
    todoList.toggleAll();
    listTodos.displayTodos();
 }
};

var listTodos = {
  displayTodos: function() {
   var todoUl = document.querySelector('ul');
   todoUl.innerHTML = '';
    for(let i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var completedTodo = '';

      if(todo.completed === true) {
        completedTodo = '(√) ' + todo.todoText;
      }
      else {
        completedTodo = '( ) ' + todo.todoText;
      }
      todoLi.id = i;
      todoLi.textContent = completedTodo;
      todoLi.appendChild(this.cdBtn());
      todoUl.appendChild(todoLi);
    }
  },
  cdBtn: function() {
    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className = 'deleteBtn';
    return deleteBtn;
  },
  setEvents: function() {
  var todoUl = document.querySelector('ul');

  todoUl.addEventListener('click', function(event) {
   var clicked = event.target;
   if(clicked.className === 'deleteBtn') {
    handler.deleteTodo(parseInt(clicked.parentNode.id));
   }
  });
 }
};

listTodos.setEvents();


// $(document).ready(function(){
// //   // this is where we jquery
// //   //var keyData = 'ourKey'; // going to need to make this dynamic?

  // $('.btn-add').on('click', function(e){
  //   console.log(e);
  //   var keyData = $('.input-key').val();
  //   var valueData = $('.input-value').val();
  //   // write to db
  //   localStorage.setItem(keyData, valueData);
  //   // read from db
  //   var displayText = keyData + ' | ' + localStorage.getItem(keyData);
  //   // this only displays the last one? might want to switch to html
  //   // and append a div
  //   // <div class="display-data-item" data-keyValue="keyData">valueData</div>
  //   // if you use backticks ` you can use ${templateLiterals}
  //   // TODO make this vars make sense across the app
  //   $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
  //   $('.input-key').val('');
  //   $('.input-value').val('');
  // });

//   // update db
//     // need to expand when  more than 1 item is added

//   // delete item
//   $('.container-data').on('click', '.display-data-item', function(e){
//     console.log(e.currentTarget.dataset.keyvalue);
//     var keyData = e.currentTarget.dataset.keyvalue;
//     localStorage.removeItem(keyData);
//     $('.container-data').text('');
//   });
//   // delete all?
//   $('.btn-clear').click(function(){
//     localStorage.clear();
//     $('.container-data').text('');
//   });

 // });