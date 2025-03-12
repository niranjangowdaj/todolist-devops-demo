// DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskStats = document.getElementById('taskStats');

// Todo array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Initialize
renderTodos();
updateStats();

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Add todo function
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        todos.push(todo);
        saveTodos();
        renderTodos();
        updateStats();
        
        // Clear input
        todoInput.value = '';
        todoInput.focus();
    }
}

// Render todos function
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        
        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        if (todo.completed) {
            checkbox.classList.add('checked');
        }
        checkbox.addEventListener('click', () => toggleTodo(todo.id));
        
        const todoText = document.createElement('div');
        todoText.classList.add('text');
        todoText.textContent = todo.text;
        todoText.addEventListener('click', () => toggleTodo(todo.id));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        
        todoList.appendChild(todoItem);
    });
}

// Toggle todo function
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
    updateStats();
}

// Delete todo function
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    
    saveTodos();
    renderTodos();
    updateStats();
}

// Update stats function
function updateStats() {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    
    taskStats.textContent = `Total tasks: ${totalTasks} | Completed: ${completedTasks}`;
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}